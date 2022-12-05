import styled from '@emotion/styled'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'

import WriteFormTemplate from '../WriteFormTemplate'

import BasicLayout from '@/components-shared/layouts/BasicLayout'
import LabelInput from '@/components-shared/system/LabelInput'
import LabelTextArea from '@/components-shared/system/LabelTextArea'
import { Item } from '@/lib/api/types'
import { updateItem } from '@/lib/api/items'

interface Props {
  item: Item
}

function EditContainer({ item }: Props) {
  const router = useRouter()
  const [form, setForm] = useState({
    title: item.title,
    body: item.body,
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const key = e.target.name as 'title' | 'body'
    setForm((prev) => ({
      ...prev,
      [key]: e.target.value,
    }))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await updateItem({
      itemId: item.id,
      ...form,
    })
    router.push(`/items/${item.id}`)
  }
  
  const errorMessage = null
  return (
    <BasicLayout title="수정" hasBackButton>
      <WriteFormTemplate buttonText="수정하기" onSubmit={onSubmit}>
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

export default EditContainer
