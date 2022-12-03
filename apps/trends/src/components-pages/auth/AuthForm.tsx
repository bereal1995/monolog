import styled from '@emotion/styled'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'

import QuestionLink from './QuestionLink'

import { mediaQuery } from '@/lib/media'
import { colors } from '@/lib/colors'
import Logo from '@/components-shared/vectors/Logo'
import LabelInput from '@/components-shared/system/LabelInput'
import Button from '@/components-shared/system/Button'

const authDescription = {
  login: {
    emailPlaceholder: '이메일주소를 입력해주세요.',
    userPlaceholder: '아이디를 입력해주세요.',
    passwordPlaceholder: '비밀번호를 입력해주세요.',
    buttonText: '로그인',
    actionText: '회원가입',
    question: '아직 회원이 아니신가요?',
    actionLink: '/auth/register',
  },
  register: {
    emailPlaceholder: '이메일주소를 입력해주세요.',
    userPlaceholder: '5~20자 사이의 영문 소문자, 숫자를 입력해주세요.',
    passwordPlaceholder: '8자 이상, 영문/숫자/특수문자 중 2가지 이상 입력해주세요.',
    buttonText: '회원가입',
    actionText: '로그인',
    question: '이미 회원이신가요?',
    actionLink: '/auth/login',
  },
}

export interface AuthInputs {
  email: string
  username: string
  password: string
  error?: string
}

interface Props {
  mode: 'login' | 'register'
  // TODO: 에러
  errorName?: string
  socialLoginButtons?: React.ReactNode
  onSubmit: SubmitHandler<AuthInputs>
}

function AuthForm({ errorName, mode, socialLoginButtons, onSubmit }: Props) {
  const { emailPlaceholder, userPlaceholder, passwordPlaceholder, buttonText, actionText, question, actionLink } = authDescription[mode]
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AuthInputs>()
  const router = useRouter()
  const next = router.query.next
  const isLoading = false

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <DeskTopLogoLink href="/">
        <Logo />
      </DeskTopLogoLink>
      <InputGroup>
        <LabelInput
          label="이메일"
          placeholder={emailPlaceholder}
          disabled={isLoading}
          {...register('email', {
            required: '이메일을 입력해주세요.',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: '이메일 형식이 올바르지 않습니다.',
            },
          })}
          errorMessage={errors.email?.message}
        />
        {mode === 'register' ? (
          <LabelInput
            label="닉네임"
            placeholder={userPlaceholder}
            disabled={isLoading}
            {...register('username', {
              required: '닉네임을 입력해주세요.',
            })}
            errorMessage={errors.username?.message}
          />
        ) : null}
        <LabelInput
          label="비밀번호"
          placeholder={passwordPlaceholder}
          disabled={isLoading}
          type="password"
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
            validate: {
              minLength: (value) => value.length >= 8 || '8자 이상 입력해주세요.',
              hasNumber: (value) => /[0-9]/.test(value) || '숫자를 포함해주세요.',
              hasSpecial: (value) => /[!@#$%^&*]/.test(value) || '특수문자를 포함해주세요.',
              hasAlphabet: (value) => /[a-zA-Z]/.test(value) || '영문을 포함해주세요.',
            },
          })}
          errorMessage={errors.password?.message}
        />
      </InputGroup>
      <ActionsBox>
        {errorName?.includes('credentials') ? <ActionErrorMessage>잘못된 계정 정보입니다.</ActionErrorMessage> : null}
        <Buttons>
          <Button layoutmode="fullWidth" type="submit" disabled={isLoading}>
            {buttonText}
          </Button>
          {mode === 'login' ? socialLoginButtons : null}
        </Buttons>
        <QuestionLink question={question} name={actionText} href={next ? `${actionLink}?next=${next}` : actionLink} />
      </ActionsBox>
    </StyledForm>
  )
}

const StyledForm = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;

  ${mediaQuery(500)} {
    align-self: center;
    justify-content: center;
    width: 460px;
  }
`

const DeskTopLogoLink = styled(Link)`
  display: none;
  justify-content: center;
  margin-bottom: 48px;
  svg {
    width: auto;
    height: 28px;
    color: ${colors.gray5};
  }
  ${mediaQuery(500)} {
    display: flex;
  }
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const ActionsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;

  ${mediaQuery(500)} {
    margin-top: 24px;
  }
`

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`

const ActionErrorMessage = styled.div`
  text-align: center;
  color: red;
  font-size: 14px;
`

export default AuthForm
