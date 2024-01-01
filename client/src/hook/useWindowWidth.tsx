import { useState, useEffect } from 'react';
import { useDebounce } from "@uidotdev/usehooks";

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const debounce = useDebounce(windowWidth, 300);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return debounce;
};

export default useWindowWidth;
