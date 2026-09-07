import {useEffect, useState, type SubmitEvent, type ReactNode} from 'react';
import {Panel, Button, AccessBar} from '../../css/portfolio/PortfolioAccess.styles';

type Status = 'checking' | 'locked' | 'authorized' | 'error';

const PortfolioAccess = ({children}: {children: ReactNode}) => {
    const [status, setStatus] = useState<Status>('checking');
    const [password, setPassword] = useState('');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        const controller = new AbortController();
        void (async () => {
            try {
                const response = await fetch('/scripts/portfolio.php?action=status', {cache: 'no-store', signal: controller.signal});
                if (!response.ok) throw new Error('Unable to check portfolio access.');
                const data = await response.json() as {authenticated: boolean};
                if (!controller.signal.aborted) {
                    setStatus(data.authenticated ? 'authorized' : 'locked');
                }
            } catch {
                if (!controller.signal.aborted) setStatus('error');
            }
        })();
        return () => { controller.abort(); };
    }, [attempt]);

    const changeAccess = async (action: 'login' | 'logout') => {
        setBusy(true);
        setError('');
        try {
            const response = await fetch(`/scripts/portfolio.php?action=${action}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'X-Portfolio-Request': '1'},
                body: JSON.stringify(action === 'login' ? {password} : {}),
            });
            const data = await response.json() as {authenticated?: boolean; error?: string};
            if (!response.ok) throw new Error(data.error ?? 'Please try again.');
            setPassword('');
            setStatus(data.authenticated ? 'authorized' : 'locked');
        } catch (cause) {
            setError(cause instanceof Error ? cause.message : 'Unable to connect. Please try again.');
        } finally {
            setBusy(false);
        }
    };

    const submit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        void changeAccess('login');
    };

    if (status === 'authorized') return <>
        <AccessBar><Button type="button" disabled={busy} onClick={() => { void changeAccess('logout'); }}>🔒</Button></AccessBar>
        {error && <p role="alert">{error}</p>}
        {children}
    </>;

    return (
        <Panel aria-label="Portfolio access">
            {status === 'checking' && <p role="status">Checking access…</p>}
            {status === 'error' && <>
                <p role="alert">Unable to check portfolio access. Please try again.</p>
                <Button type="button" onClick={() => { setStatus('checking'); setAttempt(value => value + 1); }}>Try again</Button>
            </>}
            {status === 'locked' && (
                <form onSubmit={submit} aria-busy={busy}>
                    <label htmlFor="portfolio-password">Password</label>
                    <input id="portfolio-password" type="password" autoComplete="current-password" required maxLength={512}
                           value={password} onChange={event => { setPassword(event.target.value); }}
                           aria-describedby={error ? 'portfolio-access-error' : undefined}/>
                    {error && <p id="portfolio-access-error" role="alert">{error}</p>}
                    <Button type="submit" disabled={busy}>{busy ? 'Unlocking…' : 'Unlock portfolio'}</Button>
                </form>
            )}
        </Panel>
    );
};

export default PortfolioAccess;
