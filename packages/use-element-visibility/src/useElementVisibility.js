import "intersection-observer";
import { useCallback, useState, useEffect, useRef } from "react";

const defaultEntry = {
  isIntersecting: false,
  intersectionRatio: 0
};
const defaultOptions = {};

function useElementVisibility(options = defaultOptions) {
  const ref = useRef(null);
  const [visibility, setVisibility] = useState(defaultEntry);

  function getObserver() {
    if (ref.current === null) {
      ref.current = new window.IntersectionObserver(entries => {
        entries.forEach(entry => {
          setVisibility(entry);
        });
      }, options);
    }

    return ref.current;
  }

  const observer = getObserver();
  const subscribe = useCallback(
    node => {
      if (node) {
        observer.observe(node);
      }
    },
    [observer]
  );
  const unsubscribe = () => observer.disconnect();

  useEffect(() => {
    return () => {
      observer.disconnect();
    };
  }, [observer]);

  return [visibility, subscribe, unsubscribe];
}

export default useElementVisibility;

