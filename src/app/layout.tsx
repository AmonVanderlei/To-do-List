import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TaskContextProvider from "@/contexts/taskContext";
import { ToastContainer } from "react-toastify";
import AuthContextProvider from "@/contexts/authContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Habit Maker",
  description: "Organize and track your daily habits to build a better routine.",
  applicationName: "Habit Maker",
  authors: [
    { name: "Amon Vanderlei", url: "https://github.com/AmonVanderlei" },
  ],
  creator: "Amon Vanderlei",
  keywords: ["Habits", "Routine", "Planning", "Tasks", "To-do", "Productivity"],
  category: "productivity",
  themeColor: "#010414",
  colorScheme: "dark",
  openGraph: {
    title: "Habit Maker",
    description:
      "Habit Maker is an intuitive app designed to help you track and develop new habits. Set goals, track progress, and build a productive routine.",
    url: "https://habit-maker-amonvanderlei.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://habit-maker-amonvanderlei.vercel.app/icons/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Habit Maker - Track and build better habits",
      },
    ],
  },
  icons: {
    icon: [
      { rel: "icon", url: "/favicon.ico" },
      { rel: "icon", sizes: "16x16", url: "/icons/favicon-16x16.png" },
      { rel: "icon", sizes: "32x32", url: "/icons/favicon-32x32.png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  viewport: "width=device-width, initial-scale=1.0",
  robots: {
    index: true,
    follow: true,
  },
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
        <AuthContextProvider>
          <ToastContainer
            toastClassName="max-w-[90vw] mt-1 mr-2"
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="dark"
          />

          <TaskContextProvider>
            <div className="min-h-screen pb-8">{children}</div>
          </TaskContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
