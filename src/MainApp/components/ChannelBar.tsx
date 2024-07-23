import { useEffect, useState } from "react";
import { Channel, Server } from "syrenity/build";
import ChannelBarItem from "./ChannelBarItem";

export default function ChannelBar(props: { server: Server }) {
    const [channels, setChannels] = useState<Channel[]>([]);

    useEffect(() => {
        (async () => {
            const data = await props.server.channels.fetchList();
            setChannels(data);
        })();
    }, [props.server]);

    return (
        <div className="channel-bar-container">
            <div className="channel-bar-title">
                {props.server.name}
            </div>
            <div className="channel-bar-list">
                {
                    channels.map(channel => (
                        <ChannelBarItem key={channel.id} channel={channel} selected={false} />
                    ))
                }
            </div>
        </div>
    )
}