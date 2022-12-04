import styled from '@emotion/styled'

import { colors } from '@/lib/colors'
import { mediaQuery } from '@/lib/media'

interface Props {
  message?: string
}

function EmptyList({ message = '리스트가 비어있습니다.' }: Props) {
  return <Block>{message}</Block>
}

const Block = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;

  color: ${colors.gray3};
  line-height: 1.5;
  text-align: center;
  white-space: pre-wrap;

  ${mediaQuery(500)} {
    flex: none;
    padding: 128px 0;
    font-size: 24px;
  }
`

export default EmptyList
