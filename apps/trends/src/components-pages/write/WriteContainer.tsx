import { useRouter } from 'next/router'

import WriteFormTemplate from './WriteFormTemplate'

import BasicLayout from '@/components-shared/layouts/BasicLayout'
import LabelInput from '@/components-shared/system/LabelInput'
import { useWriteActions, useWriteValue } from '@/states/write'

function WriteContainer() {
  const router = useRouter()
  const state = useWriteValue()
  const actions = useWriteActions()

  return (
    <BasicLayout title="링크 입력" hasBackButton>
      <WriteFormTemplate
        description="공유하고 싶은 URL을 입력하세요."
        buttonText="다음"
        onSubmit={(e) => {
          e.preventDefault()
          router.push(`/write/intro`)
        }}
      >
        <LabelInput
          label="URL"
          placeholder="https://example.com"
          value={state.form.link}
          onChange={(e) => {
            actions.change('link', e.target.value)
          }}
          errorMessage={state.error?.statusCode === 422 ? '유효하지 않은 URL입니다.' : undefined}
        />
      </WriteFormTemplate>
    </BasicLayout>
  )
}

export default WriteContainer
