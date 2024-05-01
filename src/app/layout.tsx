import type { Metadata } from "next";

import "./globals.css";
import Head from "next/head";



export const metadata: Metadata = {
  title: "pritamjana.com",
  description: "Personal portfolio of pritamjana | pritamjana.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  <Head >
    <link rel="stylesheet" href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.3.2/build/styles/default.min.css"></link>
  </Head>
  
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  );
}
