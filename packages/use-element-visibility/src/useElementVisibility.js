import "intersection-observer";
import { useCallback, useState, useEffect, useRef } from "react";

const defaultOptions = {
  numberOfEntries: 1,
};

function getDefaultEntry(count) {
  const defaultEntry = {
    isIntersecting: false,
    intersectionRatio: 0
  };

  if (count > 1) {
    return new Array(count).fill().map(() => defaultEntry);
  }

  return defaultEntry;
}

function useElementVisibility(options = defaultOptions) {
  const ref = useRef(null);
  const { numberOfEntries } = options;
  const [visibility, setVisibility] = useState(getDefaultEntry(numberOfEntries));

  function getObserver() {
    if (ref.current === null) {
      ref.current = new window.IntersectionObserver(entries => {
        if (numberOfEntries > 1) {
          setVisibility(entries);
        } else {
          setVisibility(entries[0]);
        }
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

