import styled from "@emotion/styled"
import Link from "next/link"

import { colors } from "@/lib/colors"


interface Props {
  question: string
  name: string
  href: string
  className?: string
}

function QuestionLink({ question, name, href, className }: Props) {
  return (
    <Block className={className}>
      {question} <Link href={href}>{name}</Link>
    </Block>
  )
}

const Block = styled.div`
  color: ${colors.gray3};
  a {
    font-weight: 600;
    color: ${colors.gray5};
  }
`

export default QuestionLink
