import styled from '@emotion/styled'

import ListItem from './ListItem'

import { BlockType } from '@/src/api/notion'

interface Props {
  posts: BlockType[]
}

function PostList({ posts }: Props) {
  return (
    <Block>
      {posts.map((post) => (
        <ListItem key={post.id} block={post} />
      ))}
    </Block>
  )
}

const Block = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  column-gap: 1.5rem;
`

export default PostList
