import type { APIRoute } from 'astro';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import eventsRaw from '../../../events.json';
import type { EventItem } from '../../types/event';

export const prerender = false;

// Load Inter font at startup
let interFont: ArrayBuffer;
try {
  const fontPath = resolve(process.cwd(), 'node_modules/@fontsource/inter/files/inter-latin-700-normal.woff');
  interFont = readFileSync(fontPath).buffer as ArrayBuffer;
} catch {
  // Fallback: try another common path
  try {
    const fontPath2 = resolve(process.cwd(), 'public/fonts/inter-700.woff');
    interFont = readFileSync(fontPath2).buffer as ArrayBuffer;
  } catch {
    interFont = new ArrayBuffer(0);
  }
}

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;
  const events = eventsRaw as EventItem[];
  const event = events.find(e => String(e.id) === id);

  // Only generate for ETH Lima events
  const isEthLima = event?.tags?.some(t => t.toLowerCase() === 'ethlima');

  if (!event || !isEthLima) {
    return new Response('Not found', { status: 404 });
  }

  const typeColors: Record<string, string> = {
    conference: '#627eea',
    workshop: '#10b981',
    hackathon: '#f59e0b',
    meetup: '#a78bfa',
    bootcamp: '#6366f1',
    cohorte: '#ec4899',
    buildathon: '#2dd4bf',
  };

  const accentColor = typeColors[event.type?.toLowerCase()] || '#627eea';

  // Format date
  let dateDisplay = event.date || '';
  try {
    dateDisplay = new Date(event.date + 'T00:00').toLocaleDateString('es-PE', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  } catch { /* keep raw */ }

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #030407 0%, #0d1017 50%, #030407 100%)',
          padding: '60px',
          fontFamily: 'Inter',
          position: 'relative',
          overflow: 'hidden',
        },
        children: [
          // Glow blob
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: '-100px',
                right: '-100px',
                width: '500px',
                height: '500px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${accentColor}33 0%, transparent 70%)`,
              }
            }
          },
          // ETH Lima logo area
          {
            type: 'div',
            props: {
              style: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      width: '36px', height: '36px', borderRadius: '50%',
                      background: `${accentColor}22`, border: `1.5px solid ${accentColor}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    },
                    children: [{
                      type: 'div',
                      props: { style: { width: '12px', height: '12px', borderRadius: '50%', background: accentColor } }
                    }]
                  }
                },
                {
                  type: 'span',
                  props: {
                    style: { color: '#ffffff', fontSize: '16px', fontWeight: '700', letterSpacing: '2px' },
                    children: 'ETHEREUM LIMA'
                  }
                },
                {
                  type: 'span',
                  props: {
                    style: {
                      color: accentColor, fontSize: '11px', fontWeight: '700',
                      padding: '3px 10px', border: `1px solid ${accentColor}44`,
                      borderRadius: '100px', background: `${accentColor}15`,
                      letterSpacing: '1.5px', marginLeft: '8px'
                    },
                    children: event.type?.toUpperCase() || 'EVENTO'
                  }
                }
              ]
            }
          },
          // Title
          {
            type: 'div',
            props: {
              style: {
                color: '#ffffff', fontSize: event.title.length > 50 ? '44px' : '56px',
                fontWeight: '700', lineHeight: '1.15', flex: '1',
                maxWidth: '800px',
              },
              children: event.title
            }
          },
          // Bottom meta bar
          {
            type: 'div',
            props: {
              style: {
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginTop: 'auto', paddingTop: '32px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', flexDirection: 'column', gap: '4px' },
                    children: [
                      { type: 'span', props: { style: { color: '#94a3b8', fontSize: '12px', letterSpacing: '1.5px' }, children: 'FECHA' } },
                      { type: 'span', props: { style: { color: '#ffffff', fontSize: '20px', fontWeight: '600' }, children: dateDisplay } }
                    ]
                  }
                },
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' },
                    children: [
                      { type: 'span', props: { style: { color: '#94a3b8', fontSize: '12px', letterSpacing: '1.5px' }, children: 'ORGANIZA' } },
                      { type: 'span', props: { style: { color: '#ffffff', fontSize: '20px', fontWeight: '600' }, children: event.organizer || 'Ethereum Lima' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      width: 1200,
      height: 630,
      fonts: interFont.byteLength > 0 ? [{ name: 'Inter', data: interFont, weight: 700, style: 'normal' }] : [],
    }
  );

  const resvg = new Resvg(svg, { background: '#030407' });
  const pngData = resvg.render().asPng();

  return new Response(pngData, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
};
