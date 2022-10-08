import styled from '@emotion/styled'

import Block from './Block'

import { BlockType } from '@/src/api/notion'

interface Props {
  blockChildren?: BlockType[]
}

function BlockChildren({ blockChildren }: Props) {
  if (!blockChildren) return null

  return (
    <BlockChildrenBox>
      {blockChildren.map((childBlock) => {
        return <Block key={`${childBlock.id}-child-${childBlock.id}`} block={childBlock} />
      })}
    </BlockChildrenBox>
  )
}

export default BlockChildren

const BlockChildrenBox = styled.div`
  margin-left: 20px;
`
