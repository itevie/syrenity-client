import { useEffect, useState } from "react";
import { Channel } from "syrenity/build";
import ChannelContent from "./ChannelContent";

const channelContents: Map<number, JSX.Element> = new Map();
let updateContent = (id: number): void => { };
export let selectedChannel: Channel | null = null;

export default function ChannelContentContainer(props: { setChannel?: JSX.Element | null } = { setChannel: null }) {
    const [activeContent, setActiveContent] = useState<JSX.Element | null>(null);

    useEffect(() => {
        console.log("ChannelContentContainer:", props.setChannel)
        if (props.setChannel) {
            setActiveContent(props.setChannel)
        } else {
            updateContent = id => {
                console.log("ChannelContentContainer change:", props.setChannel)
                setActiveContent(channelContents.get(id) as JSX.Element);
            }
        }
    }, [props]);

    return (
        <div className="content-bar">
            {
                activeContent || <></>
            }
        </div>
    )
}

export async function loadChannelContents(channel: Channel): Promise<void> {
    // Check if it already exists
    if (!channelContents.has(channel.id))
        channelContents.set(channel.id, (<ChannelContent channel={channel} />));

    // Set URL
    window.history.pushState(null, "", `/channels/${(await channel.getServer()).id}/${channel.id}`);

    // Load it
    selectedChannel = channel;
    updateContent(channel.id);
}