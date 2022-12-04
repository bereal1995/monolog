import { useState } from 'react'
import styled from '@emotion/styled'

import { useMutation } from '@tanstack/react-query'

import { useRouter } from 'next/router'

import WriteFormTemplate from '../WriteFormTemplate'

import BasicLayout from '@/components-shared/layouts/BasicLayout'
import { useWriteActions, useWriteValue } from '@/states/write'
import LabelTextArea from '@/components-shared/system/LabelTextArea'
import LabelInput from '@/components-shared/system/LabelInput'
import { createItem } from '@/lib/api/items'
import { extractError } from '@/lib/error'

function IntroContainer() {
  const router = useRouter()
  const { form } = useWriteValue()
  const actions = useWriteActions()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { mutateAsync } = useMutation(createItem, {
    onSuccess: (item) => {
      router.push(`/items/${item.id}`)
    },
    onError: (e) => {
      const error = extractError(e)
      console.log('error', error)
      if (error.statusCode === 422) {
        actions.setError(error)
        router.back()
      }
    },
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const key = e.target.name as 'title' | 'body'
    actions.change(key, e.target.value)
  }

  return (
    <BasicLayout title="뉴스 소개" hasBackButton>
      <WriteFormTemplate
        description="공유할 뉴스를 소개하세요."
        buttonText="등록"
        onSubmit={(e) => {
          e.preventDefault()
          if (form.title === '' || form.body === '') {
            setErrorMessage('제목과 내용을 모두 입력해주세요.')
            return
          }

          mutateAsync(form)
        }}
      >
        <Group>
          <LabelInput label="제목" name="title" onChange={onChange} value={form.title} />
          <StyledLabelTextArea label="내용" name="body" onChange={onChange} value={form.body} />
          {errorMessage ? <Message>{errorMessage}</Message> : null}
        </Group>
      </WriteFormTemplate>
    </BasicLayout>
  )
}

const Group = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 16px;
`

const StyledLabelTextArea = styled(LabelTextArea)`
  flex: 1;
  textarea {
    flex: 1;
    resize: none;
    font-family: inherit;
  }
`

const Message = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: red;
  text-align: center;
`

export default IntroContainer
