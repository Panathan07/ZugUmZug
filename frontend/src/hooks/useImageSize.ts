import { RefObject, useEffect, useState } from "react";

type ImageSize = {
  width: number;
  height: number;
};

export const useImageSize = (
  imgRef: RefObject<HTMLImageElement>,
): ImageSize => {
  const [size, setSize] = useState<ImageSize>({ width: 100, height: 100 });

  useEffect(() => {
    const handleResize = () => {
      if (imgRef.current) {
        setSize({
          width: imgRef.current.clientWidth,
          height: imgRef.current.clientHeight,
        });
      }
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
