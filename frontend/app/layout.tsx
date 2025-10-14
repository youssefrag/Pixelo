import localFont from "next/font/local";
import { config } from "@fortawesome/fontawesome-svg-core";
// import "@fortawesome/fontawesome-svg-core/styles.css";

import "@/app/globals.css";
import Providers from "./Providers";

config.autoAddCss = false;
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
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
