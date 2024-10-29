import styled from '@emotion/styled'
import React from 'react'

import Marquee from '@/src/posts/marquee/Marquee'

function Home() {
  return (
    <Block>
      <h2>Marquee</h2>
      <div style={{ width: '300px', backgroundColor: '#fcf' }}>
        <Marquee>
          <div
            style={{
              display: 'flex',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            <div>1번 dsadasda</div>
            <div>2번 dsadasda</div>
            <div>3번 dsadasda</div>
            {/* <div>4번 dsadasda</div>
          <div>5번 dsadasda</div>
          <div>6번 dsadasda</div> */}
          </div>
        </Marquee>
      </div>
    </Block>
  )
}

const Block = styled.div``
export const getStaticProps = () => {
  return {
    props: {},
  }
}

export default Home
