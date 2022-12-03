import styled from '@emotion/styled'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import IconToggleButton from './IconToggleButton'

import { colors } from '@/lib/colors'

type Size = 'small' | 'medium'
interface Props {
  isLiked?: boolean
  size?: Size
  onClick?(): void
}
function LikeButton({ isLiked, size = 'medium', onClick }: Props) {
  return (
    <IconToggleButton
      isActive={isLiked}
      activeIcon={<StyledHeartFill key="fill" />}
      inactiveIcon={<StyledHeartOutline key="outline" />}
      size={size}
      onClick={onClick}
    />
  )
}

const StyledHeartOutline = styled(AiOutlineHeart)`
  color: ${colors.gray3};
`

const StyledHeartFill = styled(AiFillHeart)`
  color: ${colors.primary};
`

export default LikeButton
