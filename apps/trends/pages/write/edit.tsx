import { GetServerSideProps } from 'next'

import EditContainer from '@/components-pages/write/edit/EditContainer'
import { getItem } from '@/lib/api/items'
import { Item } from '@/lib/api/types'

interface Props {
  item: Item
}

export default function Edit({ item }: Props) {
  return <EditContainer item={item} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const itemId = Number(context.query?.itemId!)
  const item = await getItem(itemId)

  return {
    props: {
      item,
    },
  }
}
