import styled from '@emotion/styled'
import { User } from './GlobalHeader'

function UserInfo({ user, onLogout }: { user: User; onLogout(): void }) {
  return (
    <Block>
      <div>반갑습니다! {user.name}님</div>
      <Avatar
        onClick={() => {
          if (typeof window === 'undefined') return
          if (confirm('로그아웃 하시겠습니까?')) {
            onLogout()
          }
        }}
      >
        <img src={user.photoUrl} alt="유저 프로필 이미지" />
      </Avatar>
    </Block>
  )
}

const Block = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export default UserInfo
