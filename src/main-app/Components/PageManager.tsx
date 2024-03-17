import { useEffect, useState } from "react";
import UserSettings from "../pages/userSettings";
import Friends from "../pages/friends";
import GuildSettings from "../pages/guildSettings";


export type Pages = "app_settings" | "friends" | "guild_settings";
export let showPage = (page: Pages) => {};
export let closePage = () => {};

export default function PageManager() {
  const [activePage, setActivePage] = useState<Pages>();
  
  useEffect(() => {
    showPage = page => setActivePage(page);
    closePage = () => setActivePage(undefined);
  }, []);

  return (
    <>
      { !activePage ? <></> : 
        {
          "app_settings": <UserSettings></UserSettings>,
          "friends": <Friends></Friends>,
          "guild_settings": <GuildSettings />
        }[activePage]
      }
    </>
  );
}