import { useEffect, useRef, useState } from "react";

let setExpandedImage = (src: string) => {};

export default function FullscreenImageViewer() {
  const [image, setImage] = useState<string | null>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    divRef.current?.addEventListener("click", () => {
      setImage(null);
    });

    setExpandedImage = src => {
      setImage(src);
    }
  }, []);

  return (
    <div ref={divRef} style={{ display: image ? "block" : "none" }} className="image-expanded-backdrop">
      <img src={image || ""} alt="a" className="image-expanded-image"></img>
    </div>
  );
}

export {setExpandedImage};