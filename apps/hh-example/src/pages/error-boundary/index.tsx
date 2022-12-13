import { dehydrate, QueryClient, QueryErrorResetBoundary } from '@tanstack/react-query'

import styled from '@emotion/styled'

import DefaultLayout from '@/src/layout/DefaultLayout'
import TodoList from '@/src/posts/error-boundary/components/TodoList'
import AsyncBoundary from '@/src/posts/error-boundary/components/AsyncBoundary'
import PendingFallback from '@/src/posts/error-boundary/components/PendingFallback'
import RejectedFallback from '@/src/posts/error-boundary/components/RejectedFallback'

function ErrorBoundaryPage() {
  return (
    <DefaultLayout title="에러 바운더리">
      <Block>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <AsyncBoundary onReset={reset} pendingFallback={<PendingFallback />} RejectedFallback={RejectedFallback}>
              <TodoList />
            </AsyncBoundary>
          )}
        </QueryErrorResetBoundary>
      </Block>
    </DefaultLayout>
  )
}

const Block = styled.div`
  padding: 10px;
  margin: 10px;
  border: 1px solid #000;
  border-radius: 5px;
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
