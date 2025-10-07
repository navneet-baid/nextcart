import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content="#1E1E1E" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="NextCart — E-commerce Store built with Next.js for project submission" />
      </Head>
      <body>

        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
