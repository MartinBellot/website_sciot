import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };
export const alt = 'Le Sciøt Cial Club — Bar, Concerts & Soirées en Cotentin';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #8d4932 0%, #4d2a1c 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Decorative top bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: '#b88a68',
          }}
        />
        {/* Tagline top */}
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: 'rgba(255,255,255,0.45)',
            textTransform: 'uppercase',
            letterSpacing: '0.4em',
            marginBottom: '28px',
          }}
        >
          Sciotot · Cotentin · Normandie
        </div>
        {/* Main title */}
        <div
          style={{
            fontSize: 88,
            fontWeight: 900,
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.05,
            marginBottom: '20px',
          }}
        >
          Le Sciøt Cial Club
        </div>
        {/* Separator */}
        <div
          style={{
            width: '80px',
            height: '4px',
            background: '#b88a68',
            borderRadius: '2px',
            marginBottom: '24px',
          }}
        />
        {/* Subtitle */}
        <div
          style={{
            fontSize: 30,
            color: 'rgba(255,255,255,0.70)',
            textAlign: 'center',
            fontWeight: 400,
            marginBottom: '10px',
          }}
        >
          Bar · Concerts Live · DJ Sets · Soirées à thème
        </div>
        {/* Address */}
        <div
          style={{
            fontSize: 20,
            color: 'rgba(255,255,255,0.40)',
            textAlign: 'center',
            marginTop: '14px',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
          }}
        >
          3 Route du Fort — Les Pieux (50340)
        </div>
        {/* URL watermark */}
        <div
          style={{
            position: 'absolute',
            bottom: '28px',
            right: '44px',
            fontSize: 18,
            color: 'rgba(255,255,255,0.25)',
            letterSpacing: '0.05em',
          }}
        >
          www.lesciotcialclub.com
        </div>
      </div>
    ),
    { ...size },
  );
}
