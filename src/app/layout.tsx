import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Readaly - 优质内容分享平台",
    template: "%s - Readaly",
  },
  description: "探索精选文章，发现有价值的内容",
  keywords: ["博客", "文章", "内容分享", "Readaly"],
  authors: [{ name: "Readaly" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "Readaly",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
