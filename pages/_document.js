import React from 'react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en" className="bg-gray-10">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            rel="preload"
            as="style"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
            media="print"
            onLoad="this.media='all'"
          />
          <noscript>
            <link 
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"
            />
          </noscript>
        </Head> 
          <body>
            <Main />
            <NextScript />
          </body>
      </Html>
    )
  }
}
