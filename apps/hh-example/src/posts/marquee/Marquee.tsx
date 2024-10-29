import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { useEffect, useState, useRef, useCallback, useMemo, ReactNode, Children } from 'react'

type Props = {
  className?: string
  play?: boolean
  direction?: 'left' | 'right'
  speed?: number
  delay?: number
  loop?: number | 'infinite'
  children?: ReactNode
}

const Marquee = ({
  className,
  play = true,
  direction = 'left',
  speed = 50,
  delay = 0,
  loop = 'infinite',
  children,
}: Props) => {
  const [containerWidth, setContainerWidth] = useState(0)
  const [marqueeWidth, setMarqueeWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  const calculateWidth = useCallback(() => {
    if (!marqueeRef.current || !containerRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const marqueeRect = marqueeRef.current.getBoundingClientRect()
    const containerWidth = containerRect.width
    const marqueeWidth = marqueeRect.width

    setContainerWidth(containerWidth)
    setMarqueeWidth(marqueeWidth)
  }, [marqueeRef, containerRef])

  const duration = useMemo(() => {
    return marqueeWidth < containerWidth ? containerWidth / speed : marqueeWidth / speed
  }, [containerWidth, marqueeWidth, speed])

  useEffect(() => {
    if (marqueeRef.current && containerRef.current) {
      const resizeObserver = new ResizeObserver(() => calculateWidth())
      resizeObserver.observe(containerRef.current)
      resizeObserver.observe(marqueeRef.current)

      return () => {
        if (!resizeObserver) return
        resizeObserver.disconnect()
      }
    }
  }, [calculateWidth, containerRef])

  return (
    <Container
      ref={containerRef}
      className={className}
      play={play}
      direction={direction}
      duration={duration}
      delay={delay}
      loop={loop}
    >
      <div className="tf-marquee" ref={marqueeRef}>
        {Children.map(children, (child) => {
          return <div className="tf-marquee-child">{child}</div>
        })}
      </div>
      <div className="tf-marquee">
        {Children.map(children, (child) => {
          return <div className="tf-marquee-child">{child}</div>
        })}
      </div>
    </Container>
  )
}

export default Marquee

const scrollFrame = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
`

const Container = styled.div<{
  play: boolean
  direction: Props['direction']
  duration: number
  delay: number
  loop: number | 'infinite'
}>`
  overflow-x: hidden;
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100%;
  transform: none;
  /*will-change: transform;*/

  .tf-marquee {
    flex: 0 0 auto;
    min-width: 100%;
    z-index: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    animation: ${scrollFrame} ${(props) => props.duration}s linear ${(props) => props.delay}s ${(props) => props.loop};
    animation-play-state: ${(props) => (props.play ? 'running' : 'paused')};
    animation-delay: ${(props) => props.delay}s;
    animation-direction: ${(props) => (props.direction === 'left' ? 'normal' : 'reverse')};
  }

  .tf-marquee-child {
    transform: none;
  }
`
