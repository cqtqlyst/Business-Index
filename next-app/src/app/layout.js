import { Inter } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const milanello = localFont({
  src: '../../public/fonts/milanello.otf',
  display: 'swap',
})


export const metadata = {
  title: "Business Index",
  description: "Business Index App for Coding and Programming 23-24",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={milanello.className}>{children}</body>
    </html>
  );
}
