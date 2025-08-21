import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google"
import { LanguageProvider } from "@/contexts/language-context"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "Кирилл - Системный администратор и сетевой инженер",
  description:
    "Портфолио системного администратора и сетевого инженера. Опыт работы с CISCO, VMware, Linux, кибербезопасность.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased`}>
      <body className="font-sans">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
