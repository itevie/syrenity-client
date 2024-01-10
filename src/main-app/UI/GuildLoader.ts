import {BaseGuild} from "../Syrenity/index";
import client from "../Client";

export default async function LoadGuild(guildId: number) {
  const guild = await client.guild(guildId).fetch();
}