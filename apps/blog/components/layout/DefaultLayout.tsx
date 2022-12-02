import Global from '../Global'

interface Props {
  children: React.ReactNode
}

function DefaultLayout({ children }: Props) {
  return (
    <>
      <Global />
      {children}
    </>
  )
}

export default DefaultLayout
