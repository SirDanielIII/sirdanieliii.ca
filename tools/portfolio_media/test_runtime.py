"""HTTP regression checks: JSON edits update running PHP without builds or caches."""

import json
from pathlib import Path
import shutil
import socket
import subprocess
import tempfile
import time
import unittest
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

PROJECT = Path(__file__).resolve().parents[2]


class RuntimeTests(unittest.TestCase):
    def setUp(self):
        temporary = tempfile.TemporaryDirectory(prefix="portfolio-runtime-")
        self.addCleanup(temporary.cleanup)
        self.root = Path(temporary.name)
        shutil.copytree(PROJECT / "public/scripts", self.root / "scripts")
        self.photo = self.root / "portfolio/photography/portraiture/sample.json"
        self.photo.parent.mkdir(parents=True)
        self.photo.with_suffix('.jpg').write_bytes(b'fixture: metadata comes from JSON')
        self.photo_data = {"filename": "sample.jpg", "title": "First title", "metadata": {}}
        self.write(self.photo, self.photo_data)
        self.video = self.root / 'portfolio/video/videography.json'
        self.films = self.root / 'portfolio/short_film/short-films.json'
        self.write(self.video, {"sections": []})
        self.write(self.films, {"featuredFilm": None, "collections": []})
        with socket.socket() as listener:
            listener.bind(('127.0.0.1', 0))
            port = listener.getsockname()[1]
        self.base = f'http://127.0.0.1:{port}/scripts/'
        process = subprocess.Popen(['php', '-S', f'127.0.0.1:{port}', '-t', str(self.root)],
                                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        self.addCleanup(lambda: (process.terminate(), process.wait(timeout=10)))
        for _ in range(50):
            try:
                self.get('list_photography')
                break
            except URLError:
                time.sleep(0.05)
        else:
            self.fail('PHP did not start')

    @staticmethod
    def write(path, data):
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(json.dumps(data), encoding='utf-8')

    def get(self, endpoint, method='GET', headers=None, suffix=''):
        request = Request(self.base + endpoint + '.php' + suffix, method=method, headers=headers or {})
        try:
            response = urlopen(request, timeout=5)
        except HTTPError as error:
            response = error
        with response:
            return response.status, response.headers, response.read()

    def test_photo_edit_removal_and_recovery_are_live(self):
        status, headers, body = self.get('list_photography')
        self.assertEqual(status, 200)
        self.assertEqual(len(json.loads(body)['photos']), 1)
        self.assertEqual(self.get('list_photography', headers={'If-None-Match': headers['ETag']})[0], 304)
        self.write(self.photo, self.photo_data | {'title': 'Edited without rebuilding'})
        status, changed, body = self.get('list_photography', headers={'If-None-Match': headers['ETag']})
        self.assertEqual(status, 200)
        self.assertNotEqual(changed['ETag'], headers['ETag'])
        self.assertEqual(json.loads(body)['photos'][0]['title'], 'Edited without rebuilding')
        self.photo.unlink()
        self.assertEqual(json.loads(self.get('list_photography')[2])['photos'], [])
        self.assertTrue(self.photo.with_suffix('.jpg').exists())
        self.write(self.photo, self.photo_data)
        self.assertEqual(len(json.loads(self.get('list_photography')[2])['photos']), 1)

    def test_media_add_remove_and_independent_errors(self):
        section = {'slug': 'new-work', 'title': 'New work', 'kind': 'channel', 'items': [
            {'slug': 'new-video', 'title': 'New video'}
        ]}
        self.write(self.video, {'sections': [section]})
        self.assertEqual(json.loads(self.get('list_videography')[2])['sections'][0]['items'][0]['title'], 'New video')
        self.write(self.video, {'sections': []})
        self.assertEqual(json.loads(self.get('list_videography')[2])['sections'], [])
        film = {'slug': 'new-film', 'title': 'New film', 'year': 2026, 'type': 'Short Film'}
        self.write(self.films, {'featuredFilm': 'new-film', 'collections': [
            {'slug': 'films', 'title': 'Films', 'films': [film]}
        ]})
        self.assertEqual(json.loads(self.get('list_short_films')[2])['featuredFilm'], 'new-film')
        self.video.write_text('{invalid', encoding='utf-8')
        status, headers, body = self.get('list_videography')
        self.assertEqual(status, 503)
        self.assertEqual(headers['Cache-Control'], 'no-store')
        self.assertNotIn(str(self.root).encode(), body)
        self.assertEqual(self.get('list_short_films')[0], 200)
        self.write(self.video, {'sections': []})
        self.assertEqual(self.get('list_videography')[0], 200)

    def test_http_contract(self):
        for endpoint in ('list_photography', 'list_videography', 'list_short_films'):
            status, headers, body = self.get(endpoint, method='HEAD')
            self.assertEqual(status, 200)
            self.assertEqual(body, b'')
            self.assertEqual(headers['Cache-Control'], 'public, no-cache')
            self.assertEqual(self.get(endpoint, method='POST')[0], 405)
            self.assertEqual(self.get(endpoint, suffix='?path=../../outside')[0], 400)


if __name__ == '__main__':
    unittest.main()
