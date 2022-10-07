import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/vsDark'

import { useState } from 'react'

import { ActionButton, Block, CodeContent, CodeHeader, PlayContent } from './Code.styled'

interface Props {
  language: Language
  code: string
  isPlay: boolean
}

function CodeBox({ language, code, isPlay }: Props) {
  const [logs, setLogs] = useState<string[]>([])
  const [text, setText] = useState('Copy')

  const onClickReset = (mgs: string[]) => {
    setLogs(mgs)
  }
  const onClickPlay = (content: string) => {
    onClickReset([])
    const old = window.console.log
    console.log = (...args) => {
      old(...args)
      setLogs((prev) => [...prev, args.toString()])
    }
    // eslint-disable-next-line no-eval
    eval(content)
    console.log = old
  }

  const onClickCopy = () => {
    navigator.clipboard.writeText(code)
    setText('Copied!')
    setTimeout(() => {
      setText('Copy')
    }, 1000)
  }

  return (
    <Block>
      <Highlight {...defaultProps} theme={theme} code={code} language={language as Language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            <CodeHeader>
              <span className="language_name">{language}</span>
              <ActionButton onClick={onClickCopy}>{text}</ActionButton>
            </CodeHeader>
            {tokens.map((line, i) => (
              <CodeContent {...getLineProps({ line, key: i })}>
                <span className="line_no">{i + 1}</span>
                <span className="line_content">
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </span>
              </CodeContent>
            ))}
          </pre>
        )}
      </Highlight>
      {isPlay && (
        <Highlight {...defaultProps} theme={theme} code={code} language={language}>
          {({ className, style }) => (
            <pre className={className} style={style}>
              <PlayContent>
                <ActionButton className="play_button play" onClick={() => onClickPlay(code)}>
                  Play
                </ActionButton>
                <ActionButton className="play_button reset" onClick={() => onClickReset([])}>
                  Reset
                </ActionButton>
                <span className="line_content">
                  {logs.map((item) => (
                    <span key={item} className="line_item">
                      {item}
                    </span>
                  ))}
                </span>
              </PlayContent>
            </pre>
          )}
        </Highlight>
      )}
    </Block>
  )
}

export default CodeBox
