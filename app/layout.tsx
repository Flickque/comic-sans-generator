import './global.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'User Generated Content Creator',
    description: 'Create your own content with fun templates!',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <head>
            <link href="https://fonts.cdnfonts.com/css/comic-sans" rel="stylesheet" />
        </head>
        <body>{children}</body>
        </html>
    )
}
