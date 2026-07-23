import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ORGTURM INVESTMENTS Private Limited | Organic Turmeric Production for the German Pharmaceutical Market',
  description:
    'ORGTURM INVESTMENTS Private Limited, a subsidiary of Global African Herbal Solutions (GAHS), produces certified organic turmeric and medicinal herbs for the German pharmaceutical market. Ecocert, Fairtrade, EU and Mabagrown certified with full international traceability.',
  keywords: [
    'ORGTURM INVESTMENTS',
    'organic turmeric production',
    'German pharmaceutical market',
    'curcumin',
    'Lakadong turmeric',
    'Ecocert',
    'Fairtrade',
    'medicinal herbs',
    'organic export',
    'GAHS',
    'Global African Herbal Solutions',
  ],
  generator: 'v0.app',
  openGraph: {
    title: 'ORGTURM INVESTMENTS | Organic Turmeric Production for German Pharmaceutical Market',
    description:
      'A subsidiary of GAHS producing certified organic turmeric for Germany, Europe and international pharmaceutical markets.',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1B5E20' },
    { media: '(prefers-color-scheme: dark)', color: '#0f2417' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} bg-background`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('gahs-theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&m)){document.documentElement.classList.add('dark')}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="bg-background font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
