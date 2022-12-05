import { useRouter } from 'next/router'
import { useUser } from '@supabase/auth-helpers-react'
import styled from '@emotion/styled'

import ItemViewer from './ItemViewer'
import CommentList from './CommentList'

import BasicLayout from '@/components-shared/layouts/BasicLayout'
import { Item, Comment } from '@/lib/api/types'
import MoreVertButton from '@/components-shared/base/MoreVertButton'
import { deleteItem } from '@/lib/api/items'
import { useOpenDialog } from '@/states/dislog'
import { useBottomSheetModalActions } from '@/states/bottomSheetModal'
import { mediaQuery } from '@/lib/media'

interface Props {
  item: Item
  comments: Comment[]
}

function ItemDetailContainer({ item, comments }: Props) {
  const router = useRouter()
  const user = useUser()
  const isMyItem = user?.id === item.user.authId
  const { open: openBottomSheetModal } = useBottomSheetModalActions()
  const openDialog = useOpenDialog()

  const onClickMore = () => {
    openBottomSheetModal([
      {
        name: '수정',
        onClick: () => {
          router.push(`/write/edit?itemId=${item.id}`)
        },
      },
      {
        name: '삭제',
        onClick: () => {
          openDialog({
            mode: 'OK_CANCEL',
            title: '삭제하시겠습니까?',
            description: '삭제된 아이템은 복구할 수 없습니다.',
            cancelText: '취소',
            confirmText: '삭제',
            async onConfirm() {
              await deleteItem(item.id)
              router.push('/')
            },
          })
        },
      },
    ])
  }

  return (
    <BasicLayout hasBackButton onGoBack={() => router.push('/')} title={null} headerRight={isMyItem && <MoreVertButton onClick={onClickMore} />}>
      <Content>
        <ItemViewer item={item} isMyItem={isMyItem} />
        {/* comments는 항상 SSR을 통해 오는 값임 */}
        <CommentList comments={comments} />
      </Content>
    </BasicLayout>
  )
}

const Content = styled.div`
  ${mediaQuery(768)} {
    width: 768px;
    padding: 0 1rem;
    margin: 0 auto;
    margin-top: 64px;
  }
`

export default ItemDetailContainer
