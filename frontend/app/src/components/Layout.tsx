import Head from 'next/head'
import React from 'react'

type props = {
  title: string
  children: React.ReactNode
}

const Layout: React.FC<props> = ({ title = 'Next.js', children }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>{title}</title>
      </Head>
      <main className="flex w-screen flex-1 flex-col items-center justify-center">
        {children}
      </main>
    </div>
  )
}
export default Layout
