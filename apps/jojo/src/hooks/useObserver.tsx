import React, { useEffect } from 'react'

interface Props {
  target: React.MutableRefObject<HTMLDivElement | null>
  onIntersect: (entries: IntersectionObserverEntry[]) => void
  root?: Element | null
  rootMargin?: string
  threshold?: number
}

export const useObserver = ({ target, onIntersect, root = null, rootMargin = '0px', threshold = 1.0 }: Props) => {
  useEffect(() => {
    let observer: IntersectionObserver

    // 넘어오는 element가 있어야 observer를 생성할 수 있도록 한다.
    if (target && target.current) {
      // callback의 인자로 들어오는 entry는 기본적으로 순환자이기 때문에
      // 복잡한 로직을 필요로 할때가 많다.
      // callback을 선언하는 곳에서 로직을 짜서 통째로 넘기도록 하겠다.
      observer = new IntersectionObserver(onIntersect, { root, rootMargin, threshold })
      // 실제 Element가 들어있는 current 관측을 시작한다.
      observer.observe(target.current)
    }

    // observer를 사용하는 컴포넌트가 해제되면 observer 역시 꺼 주자.
    return () => observer && observer.disconnect()
  }, [target, rootMargin, threshold])
}
