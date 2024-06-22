import { WrapperProvider } from '@repo/ui/containers'

const mainTitle = 'Bóveda Fiscal'

export const metadata = {
  title: mainTitle,
  description: 'Bóveda Fiscal by Covalu',
  generator: 'Next.js',
  applicationName: mainTitle,
  referrer: 'origin-when-cross-origin',
  keywords: ['Bóveda Fiscal', 'Nómina', 'CFDI'],
  authors: [{ name: 'Covalu S. C.' }]
}

export default function RootLayout ({
  children
}) {
  return (
    <html lang='es'>
      <body>
        <WrapperProvider>
          {children}
        </WrapperProvider>
      </body>
    </html>
  )
}
