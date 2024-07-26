import { Toaster } from "@/components/ui/toaster"
import type { Metadata } from "next"
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

export const metadata: Metadata = {
  title: "StaticFrame",
  description: "Configure and simply add static frames to your website in minutes.",
  icons: "https://staticframe.fbilabs.com/logo.svg",
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inriaSans.className} ${inriaSerif.variable}`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}