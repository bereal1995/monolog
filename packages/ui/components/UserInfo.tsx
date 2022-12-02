import styled from '@emotion/styled'

interface Props {
  username?: string
  avatarUrl?: string
  onClickAvatar?: () => void
}

function UserInfo({ username, avatarUrl, onClickAvatar }: Props) {
  return (
    <Block>
      <div>반갑습니다! {username}님</div>
      <Avatar onClick={onClickAvatar}>
        <img src={avatarUrl} alt="유저 프로필 이미지" />
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
