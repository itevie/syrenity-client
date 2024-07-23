import { useEffect, useState } from "react";
import { Server } from "syrenity/build";
import ChannelBar from "./ChannelBar";

const channelBars: Map<number, JSX.Element> = new Map();
let updateChannelBar = (id: number): void => {};

export default function ChannelBarContainer() {
    const [activeChannel, setActiveChannel] = useState<JSX.Element | null>(null);
    
    useEffect(() => {
        updateChannelBar = id => {
            setActiveChannel(channelBars.get(id) as JSX.Element);
        }
    }, []);

    return (
        <div className="channel-bar">
            {
                activeChannel || <></>
            }
        </div>
    )
}

export function loadServerChannels(server: Server): void {
    // Check if it already exists
    if (!channelBars.has(server.id))
        channelBars.set(server.id, (<ChannelBar server={server}/>))

    // Load it
    updateChannelBar(server.id);
}