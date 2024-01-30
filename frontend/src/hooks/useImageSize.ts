import { RefObject, useEffect, useState } from "react";

type ImageSize = {
  width: number;
  height: number;
};

export const useImageSize = (
  imgRef: RefObject<HTMLImageElement>
): ImageSize => {
  const [size, setSize] = useState<ImageSize>({ width: 100, height: 100 });

  useEffect(() => {
    const handleResize = () => {
      if (!imgRef.current) return;
      if (imgRef.current.clientHeight === 0) {
        setSize({
          width: imgRef.current.clientWidth, //! bug: On Chrome Browsers the width, clientWidth or getBoundingClientRect().width always evaluates to 0 on first render
          height: imgRef.current.height,
        });
      }
      setSize({
        width: imgRef.current.width, //! bug: On Chrome Browsers the width, clientWidth or getBoundingClientRect().width always evaluates to 0 on first render
        height: imgRef.current.height,
      });
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
    };
  }, [size.width, size.height, imgRef]);

  return size;
};
