import {Channel} from "../Syrenity/index";
import LoadChannel from "../UI/ChannelLoader";

interface ChannelBarItemProps {
  channel: Channel;
  selected: boolean;
}

export default function ChannelBarItem(props: ChannelBarItemProps) {
  return <div 
    id={`channel-list-item-${props.channel.id}`} 
    className={"channel-list-item " + (props.selected ? "channel-list-item-selected" : "")} 
    onClick={() => { LoadChannel(props.channel.id); }}
    >
    {props.channel.name}
  </div>
}