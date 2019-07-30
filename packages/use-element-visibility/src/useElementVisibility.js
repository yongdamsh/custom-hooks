import "intersection-observer";
import { useCallback, useState, useEffect, useRef } from "react";

const defaultOptions = {
  multiple: false
};

function getDefaultEntry(multiple) {
  const defaultEntry = {
    isIntersecting: false,
    intersectionRatio: 0
  };

  if (multiple) {
    return [];
  }

  return defaultEntry;
}

function useElementVisibility(options = defaultOptions) {
  const ref = useRef(null);
  const observingNodes = useRef([]);
  const { multiple } = options;
  const [visibility, setVisibility] = useState(getDefaultEntry(multiple));

  function getObserver() {
    if (ref.current === null) {
      ref.current = new window.IntersectionObserver(entries => {
        if (multiple) {
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

        if (multiple && !node.id) {
          throw new Error('target node must have id attribute in multiple mode');
        }

        const isDuplicate = observingNodes.current.some(
          currentNode => currentNode.id === node.id
        );

        if (!isDuplicate) {
          observingNodes.current.push(node);
        }
      }
    },
    [observer, multiple]
  );
  const unsubscribe = nodeId => {
    if (!nodeId) {
      observer.disconnect();
      return;
    }

    const nodeToBeUnsubscribed = observingNodes.current.find(
      node => node.id === nodeId
    );

    if (nodeToBeUnsubscribed) {
      observer.unobserve(nodeToBeUnsubscribed);
      return;
    }

    throw new Error('Cannot find the node to unsubscribe');
  };

  useEffect(() => {
    return () => {
      observer.disconnect();
    };
  }, [observer]);

  return [visibility, subscribe, unsubscribe];
}

export default useElementVisibility;
