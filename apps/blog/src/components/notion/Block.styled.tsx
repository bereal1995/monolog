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
  text-align: center;
  &:empty::after {
    content: '\\00a0';
  }
`

export const BlockChildren = styled.div`
  margin-left: 20px;
`
