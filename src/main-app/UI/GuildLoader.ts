import {BaseGuild} from "syrenity-api-client";
import client from "../Client";

export default async function LoadGuild(guildId: number) {
  const guild = await client.guild(guildId).fetch();
}