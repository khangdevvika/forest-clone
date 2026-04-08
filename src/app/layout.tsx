import type { Metadata } from "next"
import { Outfit, Inter, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { GlobalHeader } from "@/components/global-header"

/**
 * Outfit — display/timer font
 * Weights loaded: 100 (ultra-light timer), 200, 300, 400, 600
 */
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "600"],
  display: "swap",
})

/**
 * Inter — UI/body font
 * Weights loaded: 400 (body), 500 (labels), 600 (headings/buttons)
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Forest — Focus Timer",
  description: "A calm, nature-inspired focus timer. Plant your tree, stay present.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${inter.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <SidebarProvider defaultOpen={false}>
            <AppSidebar />
            <SidebarInset className="overflow-hidden h-full flex flex-col">
              <GlobalHeader />
              <main className="flex-1 overflow-auto relative">
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  )
}
