import { Channel } from "syrenity/build";
import { LinedText } from "../../components/LinedText";
import { setChannel } from "./MainContent";

interface ChannelBarItemProps {
    channel: Channel,
    selected: boolean,
}

export default function ChannelBarItem(props: ChannelBarItemProps) {
    return (
        <>
            {
                props.channel.type !== "category"
                    ? (
                        <div className="channel-list-item" onClick={() => setChannel(props.channel)}>
                            {props.channel.name}
                        </div>
                    )
                    : <LinedText>{props.channel.name}</LinedText>
            }
        </>
    )
}