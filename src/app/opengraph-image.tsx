import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'V STORIES | Premium Herbal Hair & Skincare';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
    // Brand colors
    const primary = '#2A5C43';   // Dark Green
    const highlight = '#9eb666'; // Olive Green
    const background = '#FDFBF7'; // Cream

    return new ImageResponse(
        (
            <div
                style={{
                    background: background,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                }}
            >
                {/* Decorative Circle/Logo Placeholder */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '180px',
                        height: '180px',
                        borderRadius: '50%',
                        background: highlight,
                        marginBottom: '40px',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                    }}
                >
                    <div style={{ color: 'white', fontSize: 100, fontWeight: 'bold' }}>V</div>
                </div>

                {/* Brand Name */}
                <div
                    style={{
                        fontSize: 90,
                        fontWeight: '900',
                        color: primary,
                        marginBottom: '10px',
                        letterSpacing: '-2px',
                        lineHeight: 1,
                    }}
                >
                    V STORIES
                </div>

                {/* Tagline */}
                <div
                    style={{
                        fontSize: 36,
                        color: '#5e6e3d', // slightly darker olive for text
                        textAlign: 'center',
                        maxWidth: '900px',
                        fontWeight: '500',
                    }}
                >
                    Premium Herbal Hair & Skincare
                </div>

                {/* Pill Badge */}
                <div
                    style={{
                        marginTop: '40px',
                        padding: '12px 30px',
                        background: primary,
                        color: 'white',
                        borderRadius: '50px',
                        fontSize: 24,
                        fontWeight: 'bold',
                    }}
                >
                    100% Natural • Chemical Free
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
