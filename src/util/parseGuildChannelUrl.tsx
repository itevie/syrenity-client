export default function parseGuildChannelUrl(url: URL | null = null): { guildId: number | null, channelId: number | null } {
  if (!url) url = new URL(window.location.href);
  
  // Check if it matches regex
  if (url.pathname.match(/^(\/(channels(\/[0-9]+(\/[0-9]+)?)?)?)$/)) {
    // Extract ids
    const ids = url.pathname.match(/[0-9]+/g);

    return {
      guildId: (!ids || !ids[0]) ? null : parseInt((ids as unknown as string)[0]),
      channelId: (!ids || !ids[0]) ? null : parseInt((ids as unknown as string)[1]),
    }
  }

  return {
    guildId: null,
    channelId: null,
  }
}