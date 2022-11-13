import styled from '@emotion/styled'
import { Language } from 'prism-react-renderer'

import CodeBox from '../code/CodeBox'

import { BlockProps } from './Block'
import { BlockContent, BlockItem } from './Block.styled'
import BlockChildren from './BlockChildren'
import Unsupported from './Unsupported'

function Code({ block }: BlockProps) {
  if (block?.type !== 'code') return <Unsupported />
  const isPlay = block.code.caption[0]?.plain_text === 'play'

  const code = block.code.rich_text.reduce((acc, item) => {
    if (item.type === 'text') {
      return acc + item.text.content
    }
    return acc
  }, '')
  return (
    <>
      <BlockItem>
        <CodeBlockContent>
          <CodeBox language={block.code.language as Language} code={code} isPlay={isPlay} />
        </CodeBlockContent>
      </BlockItem>
      <BlockChildren blockChildren={block.children} />
    </>
  )
}

const CodeBlockContent = styled(BlockContent)`
  width: 100%;
`

export default Code
