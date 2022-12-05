import styled from '@emotion/styled'

import DesktopHeader from '../base/DesktopHeader'

import Footer from '../base/Footer'
import MobileHeader from '../base/MobileHeader'
import FullHeightPage from '../system/FullHeightPage'

interface Props {
  header?: React.ReactNode
  children?: React.ReactNode
  className?: string
}
/**
 * 헤더와 푸터가 포함된 페이지 템플릿
 */
function TabLayout({ header, children, className }: Props) {
  return (
    <FullHeightPage>
      {header ?? (
        <>
          <MobileHeader />
          <DesktopHeader />
        </>
      )}

      <Content className={className}>{children}</Content>
      <Footer />
    </FullHeightPage>
  )
}

const Content = styled.div`
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
`

export default TabLayout
