import { SyntheticEvent } from "react";
import { setExpandedImage } from "../../Components/FullscreenImageViewer";
import client from "../Client";
import { displayContextMenu } from "../../Components/ContextMenus/ContextMenu";


export default function ImageAttachment(props: { src: string, onLoad?: (data: SyntheticEvent<HTMLImageElement, Event>) => void }) {
  const baseUrl = `http${client.useSecure ? "s" : ""}://${client.baseURL}/api/proxy/image?url=`;

  return (
    <img 
      className="message-image" 
      src={baseUrl + props.src}
      onLoad={(data)=>{if (props?.onLoad) props?.onLoad(data)}}
      onClick={() => setExpandedImage(baseUrl + props.src)}
      onContextMenu={(data) => {
        displayContextMenu({
          event: data,
          items: [
            { 
              type: "button",
              name: "Copy Media URL",
              icon: "copy",
              click: () => {
                window.navigator.clipboard.writeText(props.src);
              }
            }
          ]
        });
      }}
      alt="loading..."></img>
  );
}
