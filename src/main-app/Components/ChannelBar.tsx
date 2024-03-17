import { useEffect, useState } from "react";
import {Channel, Guild, User} from "syrenity-api-client";
import ChannelBarItem from "./ChannelBarItem";
import client from "../Client";
import parseGuildChannelUrl from "../../util/parseGuildChannelUrl";
import { selectedChannel } from "../UI/ChannelLoader";
import showGuildContextMenu from "./ContextMenus/GuildContextMenu";
import ChannelBarCommandItem from "./ChannelBarCommandItem";
import MaterialIcon from "../../Components/MaterialIcon";
import { showPage } from "./PageManager";
import { useAppSelector } from "../reduxStore";

interface ChannelBarProps {
  guildId: number | "@me";
}

let urlConsumed = false;
let initialLoadIDs: Map<number | "@me", number> = new Map();
let preSet: (number | "@me")[] = [];

let updateSelected = () => {};

export default function ChannelBar(props: ChannelBarProps) {
  const [currentChannels, setCurrentChannels] = useState<Channel[]>([]);
  const [guild, setGuild] = useState<Guild>();
  const [selectedChannelID, setSelectedChannelID] = useState<number>();
  const [users, setUsers] = useState<User[] | null>(null);
  const members = useAppSelector(state => state.members);

  // Initial effect for getting the channel list
  useEffect(() => {
    (async () => {
      // Check if it is @me
      if (props.guildId === "@me") {
        const relationships = await client.relationships.fetchList();
        const users: User[] = [];

        for (const relationship of relationships) {
          users.push(await (await relationship.fetchRecipient()).fetch())
        }

        setUsers(users);
        return;
      }

      setUsers(null);

      // Load test channel (we dont trust props owo)
      const channels = await client.guild(props.guildId).channels.fetchList();
      await client.guild(props.guildId).members.fetchList();

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
      <div 
        className="channel-title"
        style={{display: users === null ? "block" : "none"}}
        onContextMenu={data => { 
          if (!guild) return; 
          data.preventDefault(); 
          showGuildContextMenu(guild.id, members, data); 
        }}>
        {guild?.name || "Loading..."}
      </div>
      <div className="channel-list">
        {
          users === null
          ? currentChannels.map(channel => <ChannelBarItem selected={selectedChannelID === channel.id} key={`channel-bar-item-${channel.id}`} channel={channel}></ChannelBarItem>)
          : <>
            <ChannelBarCommandItem onClick={() => {showPage("friends");}}>
              <MaterialIcon icon="person" />
              <label>Friends</label>
            </ChannelBarCommandItem>
          </>
        }
      </div>
    </div>
  );
}

export {initialLoadIDs, updateSelected};