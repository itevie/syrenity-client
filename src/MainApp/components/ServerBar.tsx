import { useEffect, useState } from "react";
import ServerBarIcon from "./ServerBarIcon";
import { Server } from "syrenity/build";
import { client } from "../App";
import ToolTip from "../../components/ToolTip";
import { loadServerChannels } from "./ChannelBarContainer";
import { getServerChannel } from "../../util/urlManager";
import { loadChannelContents } from "./ChannelContentContainer";
import ServerBarUserSection from "./ServerBarUserSection";

export default function ServerBar() {
    const [servers, setServers] = useState<Server[]>([]);

    useEffect(() => {
        (async () => {
            let servers = await client.fetchServerList();
            setServers(servers);

            let urlParts = getServerChannel();
            if (urlParts.server)
                loadServerChannels(await client.servers.fetch(urlParts.server));

            if (urlParts.channel)
                loadChannelContents(await client.channels.fetch(urlParts.channel));
        })();
    }, []);

    return (
        <div className="server-bar">
            <div className="server-bar-list">
                {
                    servers.map(server => (
                        <ToolTip key={server.id} content={server.name} flyout="right">
                            <ServerBarIcon
                                server={server}
                                onClick={() => loadServerChannels(server)}
                            />
                        </ToolTip>
                    ))
                }
            </div>
            <div>
                <ServerBarUserSection />
            </div>
        </div>
    )
}