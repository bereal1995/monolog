import * as React from 'react'
import Document, { Head, Html, Main, NextScript } from 'next/document'

import { IconContext } from '@react-icons/all-files'

export default class MyDocument extends Document {
  render() {
    return (
      <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
        <Html lang='ko'>
          <Head>
            <link
              rel='apple-touch-icon'
              sizes='57x57'
              href='/apple-icon-57x57.png'
            />
            <link
              rel='apple-touch-icon'
              sizes='60x60'
              href='/apple-icon-60x60.png'
            />
            <link
              rel='apple-touch-icon'
              sizes='72x72'
              href='/apple-icon-72x72.png'
            />
            <link
              rel='apple-touch-icon'
              sizes='76x76'
              href='/apple-icon-76x76.png'
            />
            <link
              rel='apple-touch-icon'
              sizes='114x114'
              href='/apple-icon-114x114.png'
            />
            <link
              rel='apple-touch-icon'
              sizes='120x120'
              href='/apple-icon-120x120.png'
            />
            <link
              rel='apple-touch-icon'
              sizes='144x144'
              href='/apple-icon-144x144.png'
            />
            <link
              rel='apple-touch-icon'
              sizes='152x152'
              href='/apple-icon-152x152.png'
            />
            <link
              rel='apple-touch-icon'
              sizes='180x180'
              href='/apple-icon-180x180.png'
            />
            <link
              rel='icon'
              type='image/png'
              sizes='192x192'
              href='/android-icon-192x192.png'
            />
            <link
              rel='icon'
              type='image/png'
              sizes='32x32'
              href='/favicon-32x32.png'
            />
            <link
              rel='icon'
              type='image/png'
              sizes='96x96'
              href='/favicon-96x96.png'
            />
            <link
              rel='icon'
              type='image/png'
              sizes='16x16'
              href='/favicon-16x16.png'
            />
            <link rel='manifest' href='/manifest.json' />
            <meta name='msapplication-TileColor' content='#ffffff' />
            <meta
              name='msapplication-TileImage'
              content='/ms-icon-144x144.png'
            />
            <meta name='theme-color' content='#ffffff' />
          </Head>

          <body>
            <script
              dangerouslySetInnerHTML={{
                __html: `
/** Inlined version of noflash.js from use-dark-mode */
;(function () {
  var storageKey = 'darkMode'
  var classNameDark = 'dark-mode'
  var classNameLight = 'light-mode'
  function setClassOnDocumentBody(darkMode) {
    document.body.classList.add(darkMode ? classNameDark : classNameLight)
    document.body.classList.remove(darkMode ? classNameLight : classNameDark)
  }
  var preferDarkQuery = '(prefers-color-scheme: dark)'
  var mql = window.matchMedia(preferDarkQuery)
  var supportsColorSchemeQuery = mql.media === preferDarkQuery
  var localStorageTheme = null
  try {
    localStorageTheme = localStorage.getItem(storageKey)
  } catch (err) {}
  var localStorageExists = localStorageTheme !== null
  if (localStorageExists) {
    localStorageTheme = JSON.parse(localStorageTheme)
  }
  // Determine the source of truth
  if (localStorageExists) {
    // source of truth from localStorage
    setClassOnDocumentBody(localStorageTheme)
  } else if (supportsColorSchemeQuery) {
    // source of truth from system
    setClassOnDocumentBody(mql.matches)
    localStorage.setItem(storageKey, mql.matches)
  } else {
    // source of truth from document.body
    var isDarkMode = document.body.classList.contains(classNameDark)
    localStorage.setItem(storageKey, JSON.stringify(isDarkMode))
  }
})();
`
              }}
            />
            <Main />

            <NextScript />
          </body>
        </Html>
      </IconContext.Provider>
    )
  }
}
