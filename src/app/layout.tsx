import '@/app/globals.css'
import { type Metadata } from 'next'
import { Red_Hat_Display } from 'next/font/google'

const redHatDisplay = Red_Hat_Display({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Varos Dashboard',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${redHatDisplay.className} flex flex-col min-w-screen min-h-screen bg-background text-text`}
      >
        {children}
      </body>
    </html>
  )
}
