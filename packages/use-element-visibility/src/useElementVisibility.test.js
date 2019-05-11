import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import useElementVisibility from './useElementVisibility';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

test('hook is working without any errors', () => {
  act(() => {
    const Component = () => {
      useElementVisibility();
      return <div />;
    };

    ReactDOM.render(<Component />, container);
  });

  expect(container.querySelector('div')).toBeTruthy();
});

test('component renders twice by observing target node', () => {
  let renderCount = 1;

  act(() => {
    const Component = () => {
      const [visibility, subscribe] = useElementVisibility();

      useEffect(() => {
        renderCount += 1;
      });

      return (
        <div ref={subscribe} />
      );
    };

    ReactDOM.render(<Component />, container);
  });

  expect(renderCount).toBe(2);
});

test('initial visibility values', () => {
  act(() => {
    const Component = () => {
      const [visibility, subscribe] = useElementVisibility();

      return (
        <div ref={subscribe}>
          <p id="isIntersecting">{visibility.isIntersecting.toString()}</p>
          <p id="intersectionRatio">{visibility.intersectionRatio}</p>
        </div>
      );
    };

    ReactDOM.render(<Component />, container);
  });

  expect(container.querySelector('#isIntersecting').textContent).toBe('false');
  expect(container.querySelector('#intersectionRatio').textContent).toBe('0');
});
