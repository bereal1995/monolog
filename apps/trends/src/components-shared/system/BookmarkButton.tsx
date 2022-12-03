import styled from '@emotion/styled'
import { BsBookmarks, BsBookmarksFill } from 'react-icons/bs'

import IconToggleButton from './IconToggleButton'

import { colors } from '@/lib/colors'


interface Props {
  isActive?: boolean
  onClick?(): void
}
function BookmarkButton({ isActive, onClick }: Props) {
  return (
    <IconToggleButton
      isActive={isActive}
      activeIcon={<StyledBookmarkFill key="fill" />}
      inactiveIcon={<StyledBookmarkOutline key="outline" />}
      onClick={onClick}
    />
  )
}

const StyledBookmarkOutline = styled(BsBookmarks)`
  color: ${colors.gray3};
`

const StyledBookmarkFill = styled(BsBookmarksFill)`
  color: ${colors.primary};
`

export default BookmarkButton
