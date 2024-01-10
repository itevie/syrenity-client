import { SyntheticEvent } from "react";
import { setExpandedImage } from "../../Components/FullscreenImageViewer";

export default function ImageAttachment(props: { src: string, onLoad?: (data: SyntheticEvent<HTMLImageElement, Event>) => void }) {
  return (
    <img 
      className="message-image" 
      src={props.src} 
      onLoad={(data)=>{if (props?.onLoad) props?.onLoad(data)}}
      onClick={() => setExpandedImage(props.src)}
      alt="shut up"></img>
  );
}