import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Habit Maker",
  description: "Write your goals to create new habits.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Habit Maker</title>
        <meta name="title" content="Habit Maker" />
        <meta
          name="description"
          content="Write your goals to create new habits."
        />
        <meta name="theme-color" content="#1e1e32" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Amon Vanderlei" />
        <link
          href="https://cdn.jsdelivr.net/npm/daisyui@4.4.24/dist/full.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className}`}>
        <div className="navbar bg-base-100 flex-wrap">
          <div className="flex-1 justify-center">
            <Link className="btn btn-ghost !text-2xl" href="/">
              Habit Maker
            </Link>
          </div>
        </div>

        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
