import { useRef, useEffect, useState } from "react";
import ImageIcon from "../Components/ImageIcon";
import LabelledInput from "../Components/LabelledInput";
import Modal from "../Components/Modal";
import ModalHeader from "../Components/ModalHeader";
import axios from "axios";
import ShowError from "../Modals/Error";
import SingleModalLayout from "../Components/SingleModalLayout";
import SideBySide from "../Components/SideBySide";
import { disable, enable, getUrl } from "../util/quick";
import client, { startClientWithoutWebsockets } from "../main-app/Client";
import { Guild, User } from "syrenity-api-client";

export default function Invite() {
  const [guild, setGuild] = useState<Guild>();
  const [author, setAuthor] = useState<User>();

  useEffect(() => {
      // Get the code from the url
      const inviteCode = new URL(window.location.href).pathname.replace(/\/invites\//, "");

      startClientWithoutWebsockets();

      (async () => {
        const invite = await client.invite(inviteCode).fetch();
        setGuild(await invite.guild.fetch());
        setAuthor(await invite.author.fetch());
      })();
  }, []);

  function goHome(data: any) {
    data.preventDefault();
    window.location.href = "/";
    return false;
  }

  function join(data: any) {
    data.preventDefault();
    const inviteCode = new URL(window.location.href).pathname.replace(/\/invites\//, "");
    client.invite(inviteCode).use().then(() => {
      goHome({ preventDefault: () => {} });
    }).catch(err => {
      ShowError(err);
    });
  }

  return (
    <SingleModalLayout>
      <Modal parentType="form" big={true} intrusive={false}>
        <ImageIcon icon={guild?.avatar || "/images/icons/no_shape_logo.png"} className="modal-icon"></ImageIcon>
        <h1>{guild?.name || "Loading..."}</h1>
        <p>
          <b>{author?.username || "Loading"}#{author?.discriminator || "0000"} </b>
          invited you to join
          <b> {guild?.name || "Loading"}</b>,
          what do you do?
        </p>
        <SideBySide>
          <button className="jumbo" onClick={goHome}>Go Home</button>
          <button className="jumbo" onClick={join}>Join</button>
        </SideBySide>
      </Modal>
    </SingleModalLayout>
  );
}
