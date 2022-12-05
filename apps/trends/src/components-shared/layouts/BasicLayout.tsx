import styled from '@emotion/styled'

import MobileHeader from '../base/MobileHeader'
import HeaderBackButton from '../base/HeaderBackButton'
import FullHeightPage from '../system/FullHeightPage'
import DesktopHeader from '../base/DesktopHeader'

import { useGoBack } from '@/hooks/useGoBack'

interface Props {
  hasBackButton?: boolean
  title?: React.ReactNode
  headerRight?: React.ReactNode
  desktopHeaderVisible?: boolean
  children?: React.ReactNode
  onGoBack?: () => void
}

/**
 * 헤더만 포함된 페이지 템플릿
 * 헤더에는 뒤로가기 버튼이 있음
 * 헤더에는 타이틀이 있음
 */
function BasicLayout({ hasBackButton, title, headerRight, desktopHeaderVisible = true, children, onGoBack }: Props) {
  const goBack = useGoBack()

  return (
    <FullHeightPage>
      <MobileHeader title={title} headerLeft={hasBackButton ? <HeaderBackButton onClick={onGoBack ?? goBack} /> : undefined} headerRight={headerRight} />
      {desktopHeaderVisible ? <DesktopHeader /> : null}
      <Content>{children}</Content>
    </FullHeightPage>
  )
}

const Content = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  flex: 1;
`

export default BasicLayout
