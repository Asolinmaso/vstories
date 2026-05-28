'use client';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body>
                <div style={{ 
                    minHeight: '100vh', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    padding: '20px',
                    fontFamily: 'system-ui, sans-serif'
                }}>
                    <div style={{ textAlign: 'center', maxWidth: '500px' }}>
                        <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</h1>
                        <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#1D3515' }}>
                            Critical Error
                        </h2>
                        <p style={{ marginBottom: '24px', color: '#666' }}>
                            Something went seriously wrong. Please refresh the page.
                        </p>
                        <button
                            onClick={reset}
                            style={{
                                padding: '12px 24px',
                                backgroundColor: '#1D3515',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '16px'
                            }}
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            </body>
        </html>
    );
}
