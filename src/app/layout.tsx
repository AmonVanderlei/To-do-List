import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'To-do List',
  description: 'Organize your tasks with the to-do list.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/daisyui@4.4.24/dist/full.min.css" rel="stylesheet" type="text/css" />
      </head>
      <body className={`${inter.className} h-screen`}>
        
        <div className="navbar bg-base-100 flex-wrap">
          <div className="flex-1">
            <Link className="btn btn-ghost text-2xl" href="/">To-do List</Link>
          </div>
          <div className="flex-none gap-2">
            <div className="form-control">
              <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
            </div>
          </div>
        </div>

        <div>{children}</div>
      </body>
    </html>
  )
}
