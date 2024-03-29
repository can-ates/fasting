import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Container from "./components/Container";
import { FastingProvider } from "@/context";

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fasting24",
  description: "Intermittent Fasting Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={roboto.className}>
        <FastingProvider>
          <Header />
          <Container>{children}</Container>
        </FastingProvider>
      </body>
    </html>
  );
}
