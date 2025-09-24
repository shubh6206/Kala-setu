'use client';

import React, { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = '0%',
  freezeOnceVisible = false,
}: UseIntersectionObserverProps = {}): [
  (node?: Element | null) => void,
  boolean,
  IntersectionObserverEntry | undefined
] {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const [isVisible, setIsVisible] = useState(false);
  const [node, setNode] = useState<Element | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const frozen = useRef(false);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    observer.current = null;

    if (frozen.current && freezeOnceVisible) return;

    if (node) {
      observer.current = new IntersectionObserver(
        ([entry]: IntersectionObserverEntry[]) => {
          const isIntersecting = entry.isIntersecting;
          setEntry(entry);
          setIsVisible(isIntersecting);

          if (isIntersecting && freezeOnceVisible) {
            frozen.current = true;
            observer.current?.disconnect();
          }
        },
        { threshold, root, rootMargin }
      );

      observer.current.observe(node);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [node, threshold, root, rootMargin, freezeOnceVisible]);

  const setNodeRef = (node?: Element | null) => {
    setNode(node || null);
  };

  return [setNodeRef, isVisible, entry];
}

export default useIntersectionObserver;