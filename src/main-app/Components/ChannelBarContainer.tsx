import * as Syrenity from "syrenity-api-client";
import { useEffect, useState } from "react";
import ChannelBar from "./ChannelBar";

const channelBars: Map<number | "@me", JSX.Element> = new Map();
let updateGuildChannels = (id: number | "@me") => {};

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

export function loadGuildChannels(guild: Syrenity.BaseGuild | "@me") {

  // Check if the channel bar already exists
  if (guild !== "@me" && !channelBars.has(guild.id))
    channelBars.set(guild.id, <ChannelBar guildId={guild.id}></ChannelBar>);
  else if (guild === "@me" && !channelBars.has("@me"))
    channelBars.set("@me", <ChannelBar guildId="@me" />);

  // Load it
  updateGuildChannels(guild === "@me" ? guild : guild.id);
}