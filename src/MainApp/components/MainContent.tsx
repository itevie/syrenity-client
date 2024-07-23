import { useEffect, useState } from "react";
import { Channel } from "syrenity/build";
import InputArea from "./InputArea";
import ChannelContentContainer, { loadChannelContents } from "./ChannelContentContainer";
import ChannelContent from "./ChannelContent";

export let setChannel = (channel: Channel) => { };

export default function MainContent(props: { channel?: Channel | null } = { channel: null }) {
    const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
    const [selectedContent, setSelectedContent] = useState<JSX.Element | null>(null);

    useEffect(() => {

        if (props.channel) {
            setSelectedChannel(props.channel)
            setSelectedContent(<ChannelContent channel={props.channel} />);
        } else {
            setChannel = channel => {
                setSelectedChannel(channel);
                loadChannelContents(channel);
            }
        }
    }, []);

    return (
        <div className={"main-content"}>
            <div className="main-content-header">
                <label className="main-content-heeader-title">{selectedChannel?.name ?? ""}</label>
            </div>
            <div className="main-content-messages-container">
                <div className="main-content-messages">
                    <ChannelContentContainer setChannel={selectedContent} />
                </div>
                <InputArea />
            </div>
        </div>
    )
}