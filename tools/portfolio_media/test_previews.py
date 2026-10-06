"""Preview discovery excludes thumbnails and supports flattened film folders."""
from pathlib import Path
import tempfile
import unittest

from previews import references


class PreviewReferencesTests(unittest.TestCase):
    def test_thumbnail_is_skipped_but_gallery_artwork_and_logos_are_kept(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary).resolve()
            stills = root / 'film'
            stills.mkdir()
            (stills / 'still.png').touch()
            (stills / 'notes.txt').touch()
            source = {
                'logo': 'logo.png',
                'films': [{
                    'thumbnail': 'thumbnail.png',
                    'posters': ['poster.png'],
                    'screenshotsDirectory': 'film',
                }],
            }
            self.assertEqual(list(references(source, root)), ['logo.png', 'poster.png', 'film/still.png'])

    def test_image_used_as_thumbnail_and_poster_still_gets_a_gallery_preview(self):
        source = {'thumbnail': 'shared.png', 'posters': ['shared.png'], 'screenshots': ['still.png']}
        self.assertEqual(list(references(source, Path.cwd())), ['shared.png', 'still.png'])


if __name__ == '__main__':
    unittest.main()
