import './globals.css'
import { Navbar } from '@/app/components/Navbar'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Gerador de Carteirinhas DACOMP',
    description: 'Gere carteirinhas de estudantes da UTFPR',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR">
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
            </head>
            <body>
                <Navbar />
                {children}
            </body>
        </html>
    )
}
