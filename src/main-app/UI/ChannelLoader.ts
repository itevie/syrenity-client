import * as Syrenity from "../Syrenity/index";
import client from "../Client";
import { modifyUrl } from "../../util/quick";
import { updateChannel } from "../Components/MainContent";
import { loadChannelContent } from "../Components/ChannelContentContainer";
import { initialiseChannel } from "../Components/InputArea";
import { initialLoadIDs, updateSelected } from "../Components/ChannelBar";

let selectedChannel: Syrenity.Channel | null = null;

export default async function LoadChannel(channelId: number): Promise<void> {
  let channel = await client.channel(channelId).fetch();
  initialLoadIDs.set(channel.guild.id, channelId);
  selectedChannel = channel;
  updateSelected();
  modifyUrl(`/channels/${channel.guild.id}/${channel.id}`);
  updateChannel(channel);
  loadChannelContent(channelId);
  initialiseChannel(channelId);
}

export {selectedChannel};