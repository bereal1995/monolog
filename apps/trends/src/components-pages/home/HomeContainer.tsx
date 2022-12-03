import styled from '@emotion/styled'

import TabLayout from '@/components-shared/layouts/TabLayout'
import { useLocale } from '@/hooks/useLocale'
import { mediaQuery, mq } from '@/lib/media'

export default function HomeContainer() {
  const { changeLocale } = useLocale()

  return (
    <StyledTabLayout>
      <Content>
        <div>콘텐츠 영역!</div>
      </Content>
    </StyledTabLayout>
  )
}

const StyledTabLayout = styled(TabLayout)`
  padding: 16px;
`

const Content = styled.div`
  ${mediaQuery(1200)} {
    width: 1200px;
    margin: 0 auto;
  }
`
