import '@/app/globals.css'
import { type Metadata } from 'next'
import { Red_Hat_Display } from 'next/font/google'

const redHatDisplay = Red_Hat_Display({
  variable: '--font-red-hat-display',
  weight: ['500', '700'],
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
      <body className={redHatDisplay.className}>{children}</body>
    </html>
  )
}
