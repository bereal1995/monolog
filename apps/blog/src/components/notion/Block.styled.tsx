import styled from '@emotion/styled'

export const BlockItem = styled.div`
  display: flex;
  align-items: center;
  min-height: 1.5rem;
  padding: 0.25rem 0.5rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
`

export const BlockContent = styled.div`
  flex: 1;
  &:empty::after {
    content: '\\00a0';
  }
`

export const BlockChildren = styled.div`
  margin-left: 20px;
`
export const HeadItem = styled.div`
  font-weight: 600;
  line-height: 1.3;
`
