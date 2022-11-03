import styled from '@emotion/styled'
import dynamic from 'next/dynamic'

import Images from '../images'

import { wrapper } from '@/modules/store'
import { BlockType, getRootBlockChildren } from '@/api/notion'

const ListItem = dynamic(() => import('../components/home/ListItem'), { ssr: false })

interface Props {
  blocks: BlockType[]
}

export default function Home({ blocks }: Props) {
  // const { user } = useAuth()
  return (
    <Container>
      {/* <div>
        <img src={user?.photoUrl} alt="" />
        <h2>{user?.name}</h2>
      </div> */}
      <Info>
        <div>
          {/* <Image src={Images.profile} alt="profile image" layout="fill" objectFit="contain" priority /> */}
          {Images.profile ? <img src={Images.profile.src} alt="profile image" /> : null}
        </div>
        <h2>
          안녕하세요 프론트엔드 개발자 조효형입니다.
          <br />
          경험을 쌓아 나가며, 더 나은 개발자가 되기 위해 노력하고 있습니다.
        </h2>
      </Info>
      <div>
        {blocks.map((block) => (
          <ListItem key={block.id} block={block} />
        ))}
      </div>
    </Container>
  )
}

const Container = styled.div`
  max-width: 800px;
  padding: 10px;
  margin: 0 auto;
`

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  margin: 24px 0;

  & > div {
    overflow: hidden;
    position: relative;
    width: 80px;
    height: 80px;
    margin-right: 14px;
    border-radius: 50%;
    background-color: #000;
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  h2 {
    flex: 1;
  }
`

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  const blocks = await getRootBlockChildren()

  return {
    props: {
      blocks,
    },
  }
})
