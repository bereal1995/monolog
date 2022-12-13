import { dehydrate, QueryClient } from '@tanstack/react-query'

import DefaultLayout from '@/src/layout/DefaultLayout'
import { useTodoList } from '@/src/posts/error-boundary/hooks/useTodoList'

function ErrorBoundaryPage() {
  const { data } = useTodoList(10)
  return (
    <DefaultLayout title="에러 바운더리">
      <div>에러 바운더리</div>
    </DefaultLayout>
  )
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient()

  // await queryClient.prefetchQuery({
  //   queryKey: ['todoList', 10],
  //   queryFn: () => getTodoList(10),
  //   staleTime: 1000 * 60 * 60 * 24,
  //   cacheTime: 1000 * 60 * 60 * 24,
  // })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default ErrorBoundaryPage
