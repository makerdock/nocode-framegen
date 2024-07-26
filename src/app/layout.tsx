import { Toaster } from "@/components/ui/toaster"
import type { Metadata, Viewport } from "next"
import { Inria_Sans, Inria_Serif } from "next/font/google"
import "./globals.css"

const inriaSans = Inria_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--inria-sans',
  weight: "400"
})
const inriaSerif = Inria_Serif({
  subsets: ["latin"],
  variable: '--inria-serif',
  display: 'swap',
  weight: "700",
})

export const viewport: Viewport = {
  themeColor: 'black',
}

export const metadata: Metadata = {
  title: "StaticFrame",
  description: "Configure and simply add static frames to your website in minutes.",
  icons: "https://staticframe.fbilabs.com/logo.svg",
  openGraph: {
    title: "StaticFrame",
    description: "Configure and simply add static frames to your website in minutes.",
    url: "https://staticframe.fbilabs.com",
    siteName: "StaticFrame",
    images: [
      {
        url: "https://staticframe.fbilabs.com/og.png",
        width: 1200,
        height: 630,
        alt: "StaticFrame - Add static frames to your website",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StaticFrame",
    description: "Configure and simply add static frames to your website in minutes.",
    images: ["https://staticframe.fbilabs.com/og.png"],
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "https://staticframe.fbilabs.com/og.png",
    "fc:frame:image:aspect_ratio": "1.91:1",
    "fc:frame:button:1": "Follow the builder",
    "fc:frame:button:1:action": "link",
    "fc:frame:button:1:target": "https://warpcast.com/0xbhaisaab",
    "fc:frame:button:2": "Check it out",
    "fc:frame:button:2:action": "link",
    "fc:frame:button:2:target": "https://staticframe.fbilabs.com/",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://staticframe.fbilabs.com" />
        {/* Additional meta tags that can't be added through the metadata object */}
        <meta property="og:image" content="https://staticframe.fbilabs.com/og.png" />
      </head>
      <body className={`${inriaSans.className} ${inriaSerif.variable}`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}