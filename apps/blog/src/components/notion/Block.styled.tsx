import styled from '@emotion/styled'

export const BlockItem = styled.div`
  display: flex;
  align-items: flex-start;
  min-height: 1.5rem;
`

export const BlockContent = styled.div`
  flex: 1;
  padding: 3px 2px;
  &:empty::after {
    content: '\\00a0';
  }
`

export const BlockChildrenBox = styled.div`
  margin-left: 20px;
`
export const HeadItem = styled.div`
  font-weight: 600;
  line-height: 1.3;
`

export const BlockPrefix = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  min-height: calc(1.5em + 3px + 3px);
`
