import { WrapperProvider } from '@repo/ui/containers'

const mainTitle = 'Salud Conecta'

export const metadata = {
  title: mainTitle,
  description: 'Salud Conecta by Instituto Nacional de Cancerología',
  generator: 'Next.js',
  applicationName: mainTitle,
  referrer: 'origin-when-cross-origin',
  keywords: ['Salud Conecta', 'Nómina', 'CFDI'],
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
