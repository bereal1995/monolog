import { GetServerSideProps } from 'next'

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
  return <ItemDetailContainer item={item} comments={comments ?? []} />
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
