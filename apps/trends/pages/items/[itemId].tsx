import { GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'

import { getComments, getItem } from '@/lib/api/items'
import { Comment, Item } from '@/lib/api/types'
import ItemDetailContainer from '@/components-pages/items/ItemDetailContainer'
import { useCommentsQuery } from '@/hooks/query/useCommentsQuery'

interface Props {
  item: Item
  initialComments: Comment[]
}

export default function ItemDetailPage({ item, initialComments }: Props) {
  const { data: comments } = useCommentsQuery(item.id, {
    initialData: initialComments,
  })
  const shortDescription = item.body.slice(0, 300).concat(item.body.length > 300 ? '...' : '')
  return (
    <>
      <NextSeo
        title={item.title}
        description={shortDescription}
        openGraph={{
          title: item.title,
          description: shortDescription,
          images: [{ url: item.thumbnail ?? undefined }],
          article: {
            authors: [item.author],
          },
        }}
      />
      <ItemDetailContainer item={item} comments={comments ?? []} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const itemId = Number(context.params?.itemId!)
  const [item, initialComments] = await Promise.all([getItem(itemId), getComments(itemId)])

  return {
    props: {
      item,
      initialComments,
    },
  }
}
