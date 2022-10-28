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

    if (target && target.current) {
      observer = new IntersectionObserver(onIntersect, { root, rootMargin, threshold })
      observer.observe(target.current)
    }

    return () => observer && observer.disconnect()
  }, [target, rootMargin, threshold])
}
