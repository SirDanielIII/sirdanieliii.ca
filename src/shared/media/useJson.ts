import {useEffect, useState} from 'react';

const pending = new Map<string, Promise<unknown>>();

function loadJson(url: string): Promise<unknown> {
    let request = pending.get(url);
    if (!request) {
        request = fetch(url, {cache: 'no-cache'})
            .then(async response => {
                if (!response.ok) throw new Error('Content could not be loaded.');
                return await response.json() as unknown;
            })
            .finally(() => { pending.delete(url); });
        pending.set(url, request);
    }
    return request;
}

/** Share in-flight requests only; revisiting a page revalidates its editable JSON. */
export function useJson<T>(url: string, validate?: (value: unknown) => value is T): {data: T | null; status: 'loading' | 'ready' | 'error'; retry: () => void} {
    const [state, setState] = useState<{data: T | null; status: 'loading' | 'ready' | 'error'}>({data: null, status: 'loading'});
    const [attempt, setAttempt] = useState(0);
    useEffect(() => {
        let current = true;
        void loadJson(url).then(data => {
            if (validate && !validate(data)) throw new Error('Invalid content.');
            return data as T;
        }).then(
            data => { if (current) setState({data, status: 'ready'}); },
            () => { if (current) setState({data: null, status: 'error'}); },
        );
        return () => { current = false; };
    }, [url, attempt, validate]);
    return {...state, retry: () => {
        setState({data: null, status: 'loading'});
        setAttempt(value => value + 1);
    }};
}
