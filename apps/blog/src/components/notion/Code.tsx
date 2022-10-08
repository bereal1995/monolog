import { CodeBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { Language } from 'prism-react-renderer'

import CodeBox from '../code/CodeBox'

import { BlockProps } from './Block'
import { BlockContent, BlockItem } from './Block.styled'
import BlockChildren from './BlockChildren'

function Code({ block }: BlockProps<CodeBlockObjectResponse>) {
  const isPlay = block.code.caption[0]?.plain_text === 'play'
  return (
    <>
      <BlockItem>
        <BlockContent>
          <CodeBox language={block.code.language as Language} code={block.code.rich_text[0]?.plain_text ?? ''} isPlay={isPlay} />
        </BlockContent>
      </BlockItem>
      <BlockChildren blockChildren={block.children} />
    </>
  )
}

export default Code
