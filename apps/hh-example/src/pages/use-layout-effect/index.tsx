import ModalExample from '@/src/posts/use-layout-effect/ModalExample'
import DefaultLayout from '@/src/layout/DefaultLayout'

function LayoutEffectPage() {
  return (
    <DefaultLayout title="useLayoutEffect">
      <ModalExample />
    </DefaultLayout>
  )
}

export const getStaticProps = () => {
  return {
    props: {},
  }
}

export default LayoutEffectPage
