import React from 'react'

const useDebounce = (callback, delay) => {
  const timeoutRef = React.useRef(null);

  function debounce(...args) {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }

  return debounce;
}

export default useDebounce