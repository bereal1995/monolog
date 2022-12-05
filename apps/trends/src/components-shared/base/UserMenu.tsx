import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useRef } from 'react'


import { mediaQuery } from '@/lib/media'
import { colors } from '@/lib/colors'
import { useLogout } from '@/hooks/useLogout'

interface Props {
  visible: boolean
  onClose(e?: Event): void
}

function UserMenu({ visible, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const logout = useLogout()

  // useOnClickOutside(ref, (e) => {
  //   onClose(e)
  // })

  const router = useRouter()

  return (
    <AnimatePresence initial={false}>
      {visible ? (
        <Block
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            duration: 0.125,
          }}
          ref={ref}
          onClick={() => onClose()}
        >
          <Triangle />
          <TriangleBorder />
          <MenuItem isDeskTopHidden onClick={() => router.push('/write')}>
            새 글 등록
          </MenuItem>
          <MenuItem onClick={() => router.push('/setting/account')}>내 계정</MenuItem>
          <MenuItem onClick={() => router.push('/bookmarks')}>북마크</MenuItem>
          <MenuItem onClick={logout}>로그아웃</MenuItem>
        </Block>
      ) : null}
    </AnimatePresence>
  )
}

const Block = styled(motion.div)`
  position: absolute;
  right: 0;
  top: 48px;
  display: flex;
  flex-direction: column;
  width: 200px;
  background: white;
  border: 1px solid ${colors.gray0};
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
  z-index: 1;
`

const MenuItem = styled.div<{ isDeskTopHidden?: boolean }>`
  padding: 16px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
    transition: all 0.125s ease-in;
  }
  ${(props) =>
    props.isDeskTopHidden &&
    css`
      display: block;
      ${mediaQuery(700)} {
        display: none;
      }
    `}
`

const Triangle = styled.div`
  position: absolute;
  top: -8px;
  right: 16px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 8px 8px 8px;
  border-color: transparent transparent white transparent;
  z-index: 2;
`

const TriangleBorder = styled.div`
  position: absolute;
  top: -10px;
  right: 14px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 10px 10px 10px;
  border-color: transparent transparent #e0e0e0 transparent;
  z-index: 1;
`

export default UserMenu
