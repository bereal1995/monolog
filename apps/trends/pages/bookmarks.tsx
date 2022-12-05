import { GetServerSideProps } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextSeo } from 'next-seo'

import { getBookmarks } from '@/lib/api/bookmark'
import { GetBookmarksResult } from '@/lib/api/types'
import BookmarksContainer from '@/components-pages/bookmarks/BookmarksContainer'

export default function Bookmarks({ initialItems }: { initialItems: GetBookmarksResult }) {
  return (
    <>
      <NextSeo title="북마크" noindex />
      <BookmarksContainer initialData={initialItems} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const initialItems = await getBookmarks()

  return {
    props: {
      initialItems,
    },
  }
}
