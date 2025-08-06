import localFont from "next/font/local";

import "./globals.css";

const switzer = localFont({
  variable: "--font-switzer",
  src: [
    {
      path: "../public/fonts/Switzer-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={switzer.variable}>
      <body>{children}</body>
    </html>
  );
}
