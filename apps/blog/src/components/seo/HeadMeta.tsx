import Head from 'next/head'

interface Props {
  title: string
  description: string
  image: string
  url: string
}

function HeadMeta({ title, description, image, url }: Partial<Props>) {
  return (
    <Head>
      <title>{title || 'HH | 블로그'}</title>
      <meta name="description" content={description || '프론트엔드 개발자 HH의 블로그입니다. 개발관련해서 기록을 남기고 있습니다.'} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content={title || 'HH 블로그'} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || 'https://www.hhxdragon.com'} />
      <meta property="og:image" content={image} />
      <meta property="og:article:author" content="HH 블로그" />
    </Head>
  )
}

export default HeadMeta
