import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

const DOMAIN = 'https://example.com'
const CDN_URL = 'https://cdn.example.com'

export function useDefaultSeo() {
  const { t } = useTranslation('seo')
  const { asPath, locale } = useRouter()
  const canonical = `${DOMAIN}${asPath}`
  const title = t('seo:default:title') + ' - ' + t('seo:default:siteName')
  const siteName = t('seo:default:siteName')
  const description = t('seo:default:description')
  const languageAlternates = [
    { hrefLang: 'x-default', href: canonical },
    { hrefLang: 'ko', href: `${DOMAIN}/ko${asPath}` },
    { hrefLang: 'en', href: `${DOMAIN}/en${asPath}` },
    { hrefLang: 'fr', href: `${DOMAIN}/fr${asPath}` },
    { hrefLang: 'es-es', href: `${DOMAIN}/es-es${asPath}` },
    { hrefLang: 'es-mx', href: `${DOMAIN}/es-mx${asPath}` },
    { hrefLang: 'de', href: `${DOMAIN}/de${asPath}` },
    { hrefLang: 'it', href: `${DOMAIN}/it${asPath}` },
    { hrefLang: 'pl', href: `${DOMAIN}/pl${asPath}` },
    { hrefLang: 'pt', href: `${DOMAIN}/pt${asPath}` },
    { hrefLang: 'ja', href: `${DOMAIN}/ja${asPath}` },
    { hrefLang: 'tr', href: `${DOMAIN}/tr${asPath}` },
    { hrefLang: 'ru', href: `${DOMAIN}/ru${asPath}` },
    { hrefLang: 'zh', href: `${DOMAIN}/zh${asPath}` },
    { hrefLang: 'th', href: `${DOMAIN}/th${asPath}` },
  ]
  const openGraph = {
    type: 'website',
    locale,
    url: DOMAIN,
    siteName,
    title,
    description,
    images: [
      {
        url: `${CDN_URL}/lor/img/og/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'DAK.GG',
      },
    ],
  }

  const twitter = {
    site: canonical,
    cardType: 'summary_large_image',
  }

  return {
    title,
    description,
    languageAlternates,
    canonical,
    openGraph,
    twitter,
  }
}
