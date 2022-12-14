import { dehydrate, QueryClient } from '@tanstack/react-query'
import styled from '@emotion/styled'

import DefaultLayout from '@/src/layout/DefaultLayout'
import TodoList from '@/src/posts/error-boundary/components/TodoList'
import AsyncBoundaryWithQuery from '@/src/posts/error-boundary/components/AsyncBoundaryWithQuery'

function ErrorBoundaryPage() {
  return (
    <DefaultLayout title="에러 바운더리">
      <Block>
        <AsyncBoundaryWithQuery>
          <TodoList />
        </AsyncBoundaryWithQuery>
        <AsyncBoundaryWithQuery>
          <TodoList />
        </AsyncBoundaryWithQuery>
      </Block>
    </DefaultLayout>
  )
}

const Block = styled.div`
  display: flex;
  justify-content: space-evenly;
`

export const getServerSideProps = async () => {
  const queryClient = new QueryClient()

  // await queryClient.prefetchQuery({
  //   queryKey: ['todoList', 10],
  //   queryFn: () => getTodoList(10),
  // })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default ErrorBoundaryPage
