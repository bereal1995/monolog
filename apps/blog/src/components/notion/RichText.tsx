import styled from '@emotion/styled'
import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'

import { themedPalette } from 'ui/theme'

import { BlockContent } from './Block.styled'

import { createClassName } from '@/src/lib/notion'

interface Props {
  rich_text: RichTextItemResponse[]
}

function RichText({ rich_text }: Props) {
  return (
    <BlockContent>
      <Block>
        {rich_text.map((item, index) => {
          const className = createClassName(item.annotations)
          const style = { color: item.annotations.color === 'default' ? undefined : item.annotations.color }

          switch (item.type) {
            case 'text':
              if (item.href) {
                return (
                  <a key={index} className={className} style={style} href={item.href} target="_blank" rel="noreferrer">
                    {item.text.content}
                  </a>
                )
              }
              return (
                <span key={`${item.plain_text}_${index}`} className={className} style={style}>
                  {item.text.content}
                </span>
              )
            case 'mention':
              return (
                <span key={`${item.plain_text}_${index}`} className={item.type}>
                  {item.plain_text}
                </span>
              )
            case 'equation':
              return <span key={`${item.plain_text}_${index}`} className={item.type}>{`$$${item.equation.expression}$$`}</span>
            default:
              return null
          }
        })}
      </Block>
    </BlockContent>
  )
}

const Block = styled.span`
  .code {
    background: ${themedPalette.disabledBackground};
    color: #eb5757;
    border-radius: 3px;
    font-size: 85%;
    padding: 0.2em 0.4em;
  }
  .bold {
    font-weight: 600;
  }
  .italic {
    font-style: italic;
  }
  .strikethrough {
    text-decoration: line-through;
  }
  .underline {
    text-decoration: underline;
  }
  .mention {
    color: ${themedPalette.disabledBackground};
  }
  .equation {
  }
`

export default RichText
