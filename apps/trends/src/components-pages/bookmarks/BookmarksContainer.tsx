import styled from '@emotion/styled'

import { useInfiniteQuery } from '@tanstack/react-query'

import LinkCardList from '../home/LinkCardList'

import TabLayout from '@/components-shared/layouts/TabLayout'
import { mediaQuery } from '@/lib/media'
import EmptyList from '@/components-shared/system/EmptyList'
import { GetBookmarksResult } from '@/lib/api/types'
import { useIntersect } from '@/hooks/useIntersect'
import { getBookmarks } from '@/lib/api/bookmark'

interface Props {
  initialData: GetBookmarksResult
}

function BookmarksContainer({ initialData }: Props) {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(['bookmarks'], ({ pageParam }) => getBookmarks(pageParam), {
    initialData: {
      pageParams: [undefined],
      pages: [initialData],
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.pageInfo.hasNextPage) return undefined
      return lastPage.pageInfo.nextOffset
    },
  })

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target)
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage()
    }
  })
  const items = data?.pages.flatMap((page) => page.list.map((bookmark) => bookmark.item))
  return (
    <StyledTabLayout>
      {items?.length === 0 ? <EmptyList message={'북마크가 없습니다. \n나중에 다시 보고 싶은 글을 추가해보세요.'} /> : null}
      <Content>
        {items ? <LinkCardList items={items} /> : null}
        <div ref={ref} />
      </Content>
    </StyledTabLayout>
  )
}

const StyledTabLayout = styled(TabLayout)`
  padding: 16px;
`
const Content = styled.div`
  ${mediaQuery(1000)} {
    width: 1200px;
    margin: 0 auto;
  }
`

export default BookmarksContainer
