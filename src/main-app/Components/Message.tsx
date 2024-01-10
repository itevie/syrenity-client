import { useEffect, useState } from "react";
import * as Syrenity from "../Syrenity/index";
import client from "../Client";
import UserProfilePicture from "./UserProfilePicture";
import { extractImageUrls } from "../../util/quick";
import ImageAttachment from "./ImageAttachment";
import { scrollToBottom } from "./ChannelContent";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import Data from "@emoji-mart/data";
import showMessageContextMenu from "./ContextMenus/MessageContextMenu";

interface MessageProps {
  message: Syrenity.Message;
}

export default function Message(props: MessageProps) {
  const [author, setAuthor] = useState<Syrenity.User>();
  const [attachments, setAttachments] = useState<JSX.Element[]>([]);
  const [content, setContent] = useState<string>(props.message.content);

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

  return <div className="message-container" onContextMenu={(data) => {data.preventDefault();showMessageContextMenu(props.message, data.currentTarget)}}>
    <UserProfilePicture userId={props.message.author.id} avatar={author?.avatar || "null"} className="base-image message-pfp"></UserProfilePicture>
    <div className="message-content-container">
      <div className="message-header">
        <label className="message-author">
          {author?.username || "Loading..."}
        </label>
        <small className="message-timestamp">
          {props.message.createdAt.toLocaleDateString()}
        </small>
      </div>

      <div className="message-content">
        <Markdown remarkPlugins={[remarkGfm]}>{content.replace(/\n/g, "  \n")}</Markdown>
        <div>
          {attachments}
        </div>
      </div>
    </div>
  </div>
}