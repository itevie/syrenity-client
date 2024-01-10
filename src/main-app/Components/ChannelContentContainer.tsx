import { useEffect, useState } from "react";
import ChannelContent from "./ChannelContent";
import { selectedChannel } from "../UI/ChannelLoader";

const channels: Map<number, JSX.Element> = new Map();
let updateContent = (id: number) => {};

export default function ChannelMessagesContainer(this: any) {
  const [active, setActive] = useState<JSX.Element>();
  const [channelsUI, setChannels] = useState<Map<number, JSX.Element>>(new Map());

  useEffect(() => {
    updateContent = (id) => {
      setChannels(channels);
      setActive(channels.get(id));
    }
  }, []);

  return <>
    {!active ? <>Select a channel</> : (
      <>
        {Array.from(channelsUI).map(channel => (
          <div key={channel[0].toString()} style={{display: selectedChannel?.id === channel[0] ? "block" : "none"}} id={"channel-" + channel[0]}>
            {channel[1]}
          </div>
        ))}
      </>
    )}
  </>
}

export function loadChannelContent(channelId: number) {
  // Check if the channel bar already exists
  if (!channels.has(channelId))
    channels.set(channelId, <ChannelContent channelId={channelId}></ChannelContent>);

  // Load it
  updateContent(channelId);
}

export {updateContent}