import { useEffect, useState, useRef } from "react";
import * as Syrenity from "syrenity-api-client";
import client from "../Client";
import UserProfilePicture from "./UserProfilePicture";
import { extractImageUrls } from "../../util/quick";
import ImageAttachment from "./ImageAttachment";
import { scrollToBottom } from "./ChannelContent";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import Data from "@emoji-mart/data";
import showMessageContextMenu from "./ContextMenus/MessageContextMenu";
import { useAppSelector } from "../reduxStore";
import { displayContextMenu } from "../../Components/ContextMenus/ContextMenu";
import ShowConfirm from "../../Modals/Confirm";
import ShowEditMessage, { setEditMessage } from "../modals/EditMessage";

interface MessageProps {
  message: Syrenity.Message;
  isGrouped: boolean;
}

export default function Message(props: MessageProps) {
  const members = useAppSelector(state => state.members);
  const [author, setAuthor] = useState<Syrenity.User>();
  const [attachments, setAttachments] = useState<JSX.Element[]>([]);
  const [content, setContent] = useState<string>(props.message.content);
  const smallTimestampRef = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    (async () => {
      setAuthor(await client.user(props.message.author.id).fetch());

      // Check the message content for urls
      const urls = extractImageUrls(props.message.content);

      for (const i in urls) {
        const element = <ImageAttachment key={`attachment-${urls[i]}`} src={urls[i]} onLoad={() => {scrollToBottom();}}></ImageAttachment>;
        setAttachments(old => [...old, element]);
      }

      // Extract emojis
      const emojis = props.message.content.toLowerCase().match(/:[a-zA-Z_+]+:/g);

      for (const emoji of emojis || []) {
        try {
          // @ts-ignore
          const emojiNative = Data.emojis[emoji.replace(/:/g, "")];
          if (!emojiNative) continue;
          
          setContent(old => old.replace(emoji, emojiNative.skins[0].native));
        } catch {}
      }
    })();
  }, [props.message]);

  function handleMouseEnter() {
    // Check if short form is on
    if (!smallTimestampRef.current) return;

    // Show the timestamp
    smallTimestampRef.current.innerHTML =
      props.message.createdAt.toLocaleTimeString(
        [], {hour: '2-digit', minute:'2-digit'}
      );
  }

  function handleMouseLeave() {
    // Check if short form is on
    if (!smallTimestampRef.current) return;

    // Hide the timeStamp
    smallTimestampRef.current.innerHTML = "";
  }

  async function showContext(data: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    data.preventDefault();

    displayContextMenu({
      event: data,
      not: [".message-image"],
      func: async () => {
        const guildId = (await props.message.channel.fetch()).guild.id;
        const member = members[`${guildId}:${client.currentUser.id}`];
        const canDelete = !member 
          ? null 
          : Syrenity.Permissions.bitfieldHasPermission(member.permissionsBitfield, "MANAGE_MESSAGES");

        return [
          { 
            type: "button",
            name: "Copy Text",
            icon: "copy",
            click: () => {
              window.navigator.clipboard.writeText(props.message.content);
            }
          },
          { type: "seperator" },
          {
            type: "button",
            name: "Edit Message",
            icon: "edit",
            hidden: props.message.author.id !== client.currentUser.id,
            click: () => {
              setEditMessage({
                message: props.message,
                onFinish: (contents) => {
                  if (contents) props.message.edit(contents);
                }
              })
            }
          },
          {
            type: "button",
            name: "Pin Message",
            icon: "pin",
            hidden: !canDelete,
          },
          {
            type: "seperator"
          },
          {
            type: "button",
            name: "Delete",
            danger: true,
            hidden: props.message.author.id !== client.currentUser.id
              && !(canDelete),
            click: () => {
              ShowConfirm({
                question: `Are you sure you want to delete this message?`,
                confirm: async () => {
                  await props.message.delete();
                }
              });
            }
          }
        ];
      }
    });
  }

  return <div 
    className={`message-container ${props.isGrouped ? "message-container-short" : ""}`} 
    onMouseEnter={handleMouseEnter} 
    onMouseLeave={handleMouseLeave} 
    onContextMenu={showContext}>
    {
      !props.isGrouped
      ? <UserProfilePicture
        userId={props.message.author.id}
        avatar={author?.avatar || "null"}
        className="base-image message-pfp" />
      : <label
        ref={smallTimestampRef}
        className="message-short-pfp" />
    }

    <div className={`message-content-container`}>
      <div className="message-header" style={{display: !props.isGrouped ? "block" : "none"}}>
        <label className="message-author">
          {author?.username || "Loading..."}
        </label>
        <small className="message-timestamp">
          {props.message.createdAt.toLocaleDateString()}
        </small>
      </div>

      <div className={`message-content ${props.isGrouped ? "message-content-short" : ""}`}>
        <Markdown remarkPlugins={[remarkGfm]}>{content.replace(/\n/g, "  \n")}</Markdown>
        <div>
          {attachments}
        </div>
      </div>
    </div>
  </div>
}
