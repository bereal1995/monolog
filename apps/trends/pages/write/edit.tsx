import { GetServerSideProps } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextSeo } from 'next-seo'

import EditContainer from '@/components-pages/write/edit/EditContainer'
import { getItem } from '@/lib/api/items'
import { Item } from '@/lib/api/types'

interface Props {
  item: Item
}

export default function Edit({ item }: Props) {
  return (
    <>
      <NextSeo title="글 수정" noindex />
      <EditContainer item={item} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }

  const itemId = Number(ctx.query?.itemId!)
  const item = await getItem(itemId)

  return {
    props: {
      item,
    },
  }
}
