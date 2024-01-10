import { useEffect, useState } from "react";
import MaterialIcon from "../../Components/MaterialIcon";
import * as Syrenity from "../Syrenity/index";
import ChannelMessagesContainer from "./ChannelContentContainer";
import InputArea from "./InputArea";

let updateChannel = (channel: Syrenity.Channel) => {};

export default function MainContent() {
  const [channel, setChannel] = useState<Syrenity.Channel>();

  useEffect(() => {
    updateChannel = (givenChannel) => {
      setChannel(givenChannel);
    }
  }, []);

  return <div className="main-content">
    <div className="content-header">
      <label className="content-header-title">{channel?.name || "Loading..."}</label>
      <div className="content-header-right">
        <MaterialIcon icon="push_pin" className="pointer"></MaterialIcon>
        <MaterialIcon icon="person" className="pointer"></MaterialIcon>
      </div>
    </div>

    <div className="channel-content">
      <div className="channel-messages-container">
        <div className="channel-messages-content">
          <ChannelMessagesContainer></ChannelMessagesContainer>
          <div>
            <h1>You're currently not in a channel! Click on one on the side!</h1>
          </div>
        </div>
        <InputArea></InputArea>
      </div>
    </div>
  </div>
}

export {updateChannel};