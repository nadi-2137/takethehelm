export function GET() {
  const base = import.meta.env.BASE_URL

  return new Response(
    JSON.stringify(
      {
        name: 'Własny kurs — Wyżej niż szklany sufit',
        short_name: 'Własny kurs',
        description: 'Edukacyjna strona o zawodzie pilotki samolotu komercyjnego.',
        start_url: base,
        scope: base,
        display: 'standalone',
        background_color: '#0a1628',
        theme_color: '#0a1628',
        icons: [
          {
            src: `${base}android-chrome-192x192.png`,
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: `${base}android-chrome-512x512.png`,
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      null,
      2
    ),
    {
      headers: {
        'Content-Type': 'application/manifest+json; charset=utf-8',
      },
    }
  )
}
