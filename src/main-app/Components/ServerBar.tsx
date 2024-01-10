import { useEffect, useState } from "react";
import client from "../Client";
import { Guild } from "../Syrenity";
import parseGuildChannelUrl from "../../util/parseGuildChannelUrl";

import ProfilePicture from "../../Components/ProfilePicture";
import ImageIcon from "../../Components/ImageIcon";
import MaterialIcon from "../../Components/MaterialIcon";
import initialsToAvatar from "../../util/initialsToAvatar";
import GuildBarUserSection from "./GuildBarUserSection";
import { loadGuildChannels } from "./ChannelBarContainer";
import { ContextMenuItem, displayContextMenu } from "../../Components/ContextMenus/ContextMenu";
import showGuildContextMenu from "./ContextMenus/GuildContextMenu";

let urlConsumed = false;
export let _reloadGuildBar = async () => {};

export default function ServerBar() {
  let [guilds, setGuilds] = useState<Guild[]>([]);
  const url = parseGuildChannelUrl(new URL(window.location.href));

  useEffect(() => {
    _reloadGuildBar = async () => {
      // Fetch the guilds
      const fetchedGuilds = await client.guilds.fetchList();
      setGuilds(fetchedGuilds);
    }

    _reloadGuildBar();
  }, []);

  useEffect(() => {
    if (urlConsumed) return;

    const element = document.getElementById(`guild-bar-server-${url.guildId}`);
    element?.click();
    
    if (element != null) urlConsumed = true;
  });

  return (
    <div className="server-bar">
      <div className="guild-list-container">
        {/* The icons */}
        <GuildBarIcon className="guild-bar-primary" id="guild-bar-dms" tooltipContent="Your DMs" name="/images/logos/no_shape_logo.png"></GuildBarIcon>
        <GuildBarIcon id="guild-bar-favourite" tooltipContent="Favourites" name="/images/icons/favourite.png"></GuildBarIcon>
        <GuildBarMaterialIcon id="guild-bar-bookmark" tooltipContent="Bookmarks" name="bookmark"></GuildBarMaterialIcon>

        <hr></hr>
        {guilds.map(guild => {
          return (
            <ProfilePicture 
            key={`guild-bar-icon-${guild.id}`}
            className="guild-bar-icon base-image" 
            avatar={guild.avatar}
            id={`guild-bar-server-${guild.id}`}
            tooltipContent={guild.name}
            tooltipFlyout="right"
            onClick={({currentTarget}) => {
              loadGuildChannels(guild);
            }}
            onContextMenu={data => {
              data.preventDefault();
              showGuildContextMenu(guild.id, data.currentTarget);
            }}
            onErrror={target => { target.src = initialsToAvatar(guild.name); }}></ProfilePicture>
          );
        })}
        
        <GuildBarMaterialIcon id="guild-bar-add-server" tooltipContent="Create / Join a Server" name="add"></GuildBarMaterialIcon>
      </div>
      <GuildBarUserSection></GuildBarUserSection>
    </div>
  );
}

interface GuildIcon extends DefaultProps {
  name: string;
}

function GuildBarIcon(props: GuildIcon) {
  return (
    <>
      <ImageIcon 
      {...props}
      icon={props.name} className="base-image guild-bar-image guild-bar-primary"></ImageIcon>
    </>
  );
}

function GuildBarMaterialIcon(props: GuildIcon) {
  return <MaterialIcon
    {...props}
    icon={props.name} className="base-image guild-bar-image guild-bar-primary"></MaterialIcon>
}