# useElementVisibility
IntersectionObserver API + React Hooks

[![NPM](https://img.shields.io/npm/v/@yongdamsh/use-element-visibility.svg)](https://www.npmjs.com/package/use-element-visibility)


## Installation

### NPM

To install the latest version,

```sh
npm install --save @yongdamsh/use-element-visibility
```

### CDN

Add this script after the React and ReactDOM script tags.

```
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@yongdamsh/use-element-visibility"></script>
```


## Usage

### Step.1 Initialize with Options

Initialize the hook by passing the same [option](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options) as IntersectionObserver.

```jsx
import useElementVisibility from '@yongdamsh/use-element-visibility'

function SomeComponent() {
  // If there is no option, the following default values are applied.
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.0
  }

  const [visibility, subscribe, unsubscribe] = useElementVisibility(options)

  return (
    // Refer to Step.2
  )
}
```

### Step.2 Use the visibility information and subscription-related functions

`useElementVisibility` hook returns the following items as an array:

#### `visibility`  
Intersection information of the same specification as [IntersectionObserverEntry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry)

Example:  
```
{
  boundingClientRect: {
    bottom: 1788.875,
    height: 836,
    left: 0,
    right: 455,
    top: 952.875,
    width: 455,
    x: 0,
    y: 952.875
  },
  intersectionRatio: 0.0,
  intersectionRect: {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0
  },
  isIntersecting: false,
  isVisible: false,
  rootBounds: {
    bottom: 836,
    height: 836,
    left: 0,
    right: 455,
    top: 0,
    width: 455,
    x: 0,
    y: 0
  },
  target: Element, // https://developer.mozilla.org/ko/docs/Web/API/Element
  time: 6562.770000004093
}
```

#### `subscribe`  
A function for subscribing to intersection information. Use the same as [ref](https://reactjs.org/docs/hooks-reference.html#useref) for the target node.

```jsx
function SomeComponent() {
  const [visibility, subscribe, unsubscribe] = useElementVisibility()

  return (
    <main>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
      <footer id="bottom-observer" ref={subscribe}>When this area is visible, load the list further.</footer>
    </main>
  )
}
```

You can also subscribe multiple nodes by using `multiple` option as below,


```jsx
function SomeComponent() {
  const [visibilities, subscribe, unsubscribe] = useElementVisibility({ multiple: true })

  // visibilities is an array of IntersectionObserverEntry
  // so you can find each visibility by element ID
  const visibilityOfItem1 = visibilities.find(v => v.target.id === 'item1');
  const visibilityOfItem2 = visibilities.find(v => v.target.id === 'item2');
  const visibilityOfItem3 = visibilities.find(v => v.target.id === 'item3');

  return (
    <main>
      <ul>
        <li id="item1" ref={subscribe}>Item 1</li>
        <li id="item2" ref={subscribe}>Item 2</li>
        <li id="item3" ref={subscribe}>Item 3</li>
      </ul>
      <pre>
        Intersection ratio of item 1: ${visibilityOfItem1 && visibilityOfItem1.intersectionRatio}
        Intersection ratio of item 2: ${visibilityOfItem2 && visibilityOfItem2.intersectionRatio}
        Intersection ratio of item 3: ${visibilityOfItem3 && visibilityOfItem3.intersectionRatio}
      </pre>
    </main>
  )
}
```

> Note that the `id` attribute must be exist.

#### `unsubscribe`
A function to cancel subscription. This is useful if you need only until the node is exposed on the screen.

```jsx
function SomeComponent() {
  const [visibility, subscribe, unsubscribe] = useElementVisibility()

  useEffect(() => {
    if (visibility.isIntersecting) {
      unsubscribe();

      // Process lazy loading
      const lazyImage = visibility.target;
      lazyImage.src = lazyImage.dataset.src;
    }
  }, [visibility])

  return (
    <img ref={subscribe} data-src="https://example.com/foo.jpg" />
  )
}
```

You can unsubscribe a specific node as shown below.

```jsx
function SomeComponent() {
  const [visibilities, subscribe, unsubscribe] = useElementVisibility({ multiple: true });

  useEffect(() => {
    const intersectingEntries = visibilities.filter(v => v.isIntersecting);

    intersectingEntries.forEach(entry => {
      const lazyImage = entry.target;
      lazyImage.src = lazyImage.dataset.src;

      // Pass the element's id
      unsubscribe(lazyImage.id);
    });
  }, [visibilities]);

  return (
    <>
      <img id="img1" ref={subscribe} data-src="https://example.com/foo.jpg" />
      <img id="img2" ref={subscribe} data-src="https://example.com/foo.jpg" />
      <img id="img3" ref={subscribe} data-src="https://example.com/foo.jpg" />
    </>
  )
}
```

## Examples

Run the command below before looking at the example,

```sh
npm run build
```

Then run below examples in your browser.
- [basic.html](examples/basic.html): Basic use case
- [multiple-refs.html](examples/multiple-refs.html): Usage of multiple elements
Then run  in your browser.

## Browser Support

Modern browsers and IE9+

References:
- IntersectionObserver with polyfill: https://github.com/w3c/IntersectionObserver/tree/master/polyfill#browser-support
- React with polyfill: https://reactjs.org/docs/react-dom.html#browser-support
