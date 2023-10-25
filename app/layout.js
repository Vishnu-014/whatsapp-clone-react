import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/providers/theme-provider"
import { ConvexClientProvider } from '@/components/providers/convex-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Whatsapp',
  description: 'Generated by create next app',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/whatsapplogo.svg',
        href: '/whatsapplogo.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/whatsapplogo.svg',
        href: '/whatsapplogo.svg',
      },
    ],
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >{children}
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  )
}