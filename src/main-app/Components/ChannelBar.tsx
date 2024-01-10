import { useEffect, useState } from "react";
import {Channel, Guild} from "../Syrenity/index";
import ChannelBarItem from "./ChannelBarItem";
import client from "../Client";
import parseGuildChannelUrl from "../../util/parseGuildChannelUrl";
import { selectedChannel } from "../UI/ChannelLoader";
import showGuildContextMenu from "./ContextMenus/GuildContextMenu";

interface ChannelBarProps {
  guildId: number;
}

let urlConsumed = false;
let initialLoadIDs: Map<number, number> = new Map();
let preSet: number[] = [];

let updateSelected = () => {};

export default function ChannelBar(props: ChannelBarProps) {
  const [currentChannels, setCurrentChannels] = useState<Channel[]>([]);
  const [guild, setGuild] = useState<Guild>();
  const [selectedChannelID, setSelectedChannelID] = useState<number>();

  // Initial effect for getting the channel list
  useEffect(() => {
    (async () => {
      // Load test channel (we dont trust props owo)
      const channels = await client.guild(props.guildId).channels.fetchList();

      if (!preSet.includes(props.guildId)) {
        initialLoadIDs.set(props.guildId, channels[0]?.id);
        preSet.push(props.guildId);
      }

      setCurrentChannels(channels);
      setGuild(await client.guild(props.guildId).fetch());
    })();
  }, [props.guildId]);

  // Effect for telling which channel to auto load
  useEffect(() => {
    // Load the URL
    const url = parseGuildChannelUrl(new URL(window.location.href));

    // Check if it is going to use the current url e.g. /channels/1/2 it will load channel 2
    if (!urlConsumed && url.channelId) {
      const element = document.getElementById(`channel-list-item-${url.channelId || NaN}`);

      if (element != null) {
        initialLoadIDs.set(props.guildId, url.channelId);
        urlConsumed = true;
        element?.click();
      }
      return;
    }
  
    // Otherwise, it will laod the predetermined started
    let id = initialLoadIDs.has(props.guildId) ? initialLoadIDs.get(props.guildId) : NaN;
    const element = document.getElementById(`channel-list-item-${id}`)
    element?.click();
    return;
  });

  // Effect for listening for channel change
  useEffect(() => {
    updateSelected = () => {
      setSelectedChannelID(selectedChannel?.id);
    }
  }, []);

  return (
    <div className="channel-container" key={`channel-bar-${props.guildId}`}>
      <div className="channel-title" onContextMenu={data => { if (!guild) return; data.preventDefault(); showGuildContextMenu(guild.id, data.currentTarget); }}>
        {guild?.name || "Loading..."}
      </div>
      <div className="channel-list">
        {currentChannels.map(channel => <ChannelBarItem selected={selectedChannelID === channel.id} key={`channel-bar-item-${channel.id}`} channel={channel}></ChannelBarItem>)}
      </div>
    </div>
  );
}

export {initialLoadIDs, updateSelected};