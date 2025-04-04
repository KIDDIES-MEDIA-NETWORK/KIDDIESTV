import localFont from "next/font/local";
import "./globals.css";
import { AOSInit } from "./components/aos";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export const metadata = {
  title: "Loveworld Kiddies Network",
  description:
    "No 1 kid's educative creative and fun tv channel website where your child learns, grows and is fed the word of God. Proudly an arm under the Believer's loveworld from our Highly Esteemed Man of God Pst Chris Oyakhilome, DSc, DD",
    icons: {
      icon: [
        {
          url: "./LKN.png",
          href: "./LKN.png",
        },
      ],
    },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AOSInit />
      <head>
        <link
          rel="icon"
          href="./LKN.png"
          type="image/<generated>"
          sizes="32x32"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&family=Modak&family=Sniglet:wght@400;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Schoolbell&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
