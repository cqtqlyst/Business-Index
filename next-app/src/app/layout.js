import { Inter, Lato } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const milanello = localFont({
  src: '../../public/fonts/milanello.otf',
  weight: '200',
  display: 'swap',
})

const lato = Lato({
  weight: ['100', '300','400', '700', '900'],
  variable: ['--font-lato-thin', '--font-lato-light', '--font-lato-normal', '--font-lato-bold', '--font-lato-black'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})


export const metadata = {
  title: "Business Index",
  description: "Business Index App for Coding and Programming 23-24",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lato.className}>{children}</body>
    </html>
  );
}
