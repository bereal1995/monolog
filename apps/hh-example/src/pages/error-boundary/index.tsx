import { dehydrate, QueryClient } from '@tanstack/react-query'
import { Col, Row } from 'antd'

import DefaultLayout from '@/src/layout/DefaultLayout'
import TodoList from '@/src/posts/error-boundary/components/TodoList'
import AsyncBoundaryWithQuery from '@/src/posts/error-boundary/components/AsyncBoundaryWithQuery'

function ErrorBoundaryPage() {
  return (
    <DefaultLayout title="에러 바운더리">
      <Row style={{ width: '100%' }}>
        <Col span={12}>
          <AsyncBoundaryWithQuery>
            <TodoList />
          </AsyncBoundaryWithQuery>
        </Col>
        <Col span={12}>
          <AsyncBoundaryWithQuery>
            <TodoList />
          </AsyncBoundaryWithQuery>
        </Col>
      </Row>
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
