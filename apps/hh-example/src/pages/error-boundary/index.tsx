import { dehydrate, QueryClient } from '@tanstack/react-query'

import DefaultLayout from '@/src/layout/DefaultLayout'
import TodoList from '@/src/posts/error-boundary/components/TodoList'
import SSRSafeSuspense from '@/src/posts/error-boundary/components/SSRSafeSuspense'

function ErrorBoundaryPage() {
  return (
    <DefaultLayout title="에러 바운더리">
      <SSRSafeSuspense fallback={<div>loading...</div>}>
        <TodoList />
      </SSRSafeSuspense>
    </DefaultLayout>
  )
}

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
