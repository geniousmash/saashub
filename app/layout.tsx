import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "SaaSHub - Discover the Best SaaS Products",
  description: "A curated directory of top software-as-a-service tools for your business",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
