import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TaskContextProvider from "@/contexts/taskContext";
import { ToastContainer } from "react-toastify";
import AuthContextProvider from "@/contexts/authContext";

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
