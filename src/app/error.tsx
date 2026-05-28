'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log error to monitoring service (Sentry, LogRocket, etc.)
        console.error('Application error:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
            <div className="max-w-md w-full text-center">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-10 h-10 text-red-600" />
                </div>
                
                <h1 className="text-3xl font-bold text-[var(--primary)] mb-3" style={{ fontFamily: 'var(--font-peachi)' }}>
                    Oops! Something went wrong
                </h1>
                
                <p className="text-[var(--text-muted)] mb-6">
                    We encountered an unexpected error. Don't worry, our team has been notified.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={reset}
                        className="btn-primary"
                    >
                        Try Again
                    </button>
                    
                    <a
                        href="/"
                        className="px-6 py-3 rounded-full border-2 border-[var(--primary)] text-[var(--primary)] font-semibold hover:bg-[var(--primary)] hover:text-white transition-all"
                    >
                        Go Home
                    </a>
                </div>
                
                {process.env.NODE_ENV === 'development' && (
                    <details className="mt-8 text-left bg-gray-50 p-4 rounded-lg">
                        <summary className="cursor-pointer font-semibold text-sm text-gray-700 mb-2">
                            Error Details (Dev Only)
                        </summary>
                        <pre className="text-xs text-red-600 overflow-auto">
                            {error.message}
                            {error.stack}
                        </pre>
                    </details>
                )}
            </div>
        </div>
    );
}
