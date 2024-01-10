import * as Syrenity from "../Syrenity/index";
import { useEffect, useState } from "react";
import ChannelBar from "./ChannelBar";

const channelBars: Map<number, JSX.Element> = new Map();
let updateGuildChannels = (id: number) => {};

export default function ChannelBarContainer(this: any) {
  const [activeChannel, setActiveChannel] = useState<JSX.Element>();
  //const [channelBarsUI, setChannelBars] = useState<Map<number, JSX.Element>>(new Map());

  useEffect(() => {
    updateGuildChannels = (id) => {
      //setChannelBars(channelBars);
      setActiveChannel(channelBars.get(id));
    }
  }, []);

  return (
    <>
      {activeChannel || <>Select a guild</>}
    </>
  );
}

export function loadGuildChannels(guild: Syrenity.BaseGuild) {

  // Check if the channel bar already exists
  if (!channelBars.has(guild.id))
    channelBars.set(guild.id, <ChannelBar guildId={guild.id}></ChannelBar>);

  // Load it
  updateGuildChannels(guild.id);
}