import { useEffect, useRef, useState } from "react";
import Logger from "../../Logger";
import { selectedChannel } from "../UI/ChannelLoader";
import client from "../Client";
import ShowError from "../../Modals/Error";
import EmojiPicker from "@emoji-mart/react";
import Data from "@emoji-mart/data";
import MaterialIcon from "../../Components/MaterialIcon";

const logger = new Logger("input-manager");

interface InputDraft {
  content: string;
}

const drafts: Map<number, InputDraft> = new Map();
let updateInputArea: (channelId: number) => void;
let lastShow: number = 0;

export default function InputArea() {
  const [emojiPickerVisibility, setEmojiPickerVisibility] = useState<"block" | "none">("none");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      updateInputArea = channelId => {
        if (textareaRef.current)
          textareaRef.current.value = drafts.get(channelId)?.content as unknown as string;
      };
    })();

    emojiPickerRef.current?.addEventListener("click", () => {
      if (50 - (Date.now() - lastShow) < 0) {
        setEmojiPickerVisibility(old => old === "block" ? "none" : "block");
        lastShow = Date.now();
      }
    });
  }, []);

  return (
    <div className="channel-input-area">
      <label className="current-typing" id="current-typing"></label>
      <div className="content-input">
        <div className="content-input-button">
          <MaterialIcon icon="add"></MaterialIcon>
        </div>
        <textarea 
          ref={textareaRef}
          onKeyUp={(data) => handlKeyPress(data)} 
          id="input-input" 
          rows={1} 
          className="content-input-input" 
          style={{resize: "none"}}></textarea>
        <div ref={emojiPickerRef} className="content-input-button">
          <MaterialIcon id="input-area-emoji" tooltipContent="Emoji" tooltipFlyout="left" icon="mood"></MaterialIcon>
        </div>
      </div>
      <div className="the-emoji-picker" style={{display: emojiPickerVisibility}}>
        <EmojiPicker 
          set="google" 
          theme="dark"
          skinTonePosition="none"
          onEmojiSelect={(data: any) => handleEmojiPick(data)}></EmojiPicker>
      </div>
    </div>
  );
}

//<EmojiPicker onEmojiClick={(data) => handleEmojiPick(data) }lazyLoadEmojis={true} className="the-emoji-picker"></EmojiPicker>


async function handleEmojiPick(data: Data.Emoji) {
  if (!drafts.get(selectedChannel?.id || NaN))
    return;
  const draft = drafts.get(selectedChannel?.id || NaN) as unknown as InputDraft;
  draft.content += `:${data.id}:`;
  updateInputArea(selectedChannel?.id as number);
}

async function handlKeyPress(data: React.KeyboardEvent<HTMLTextAreaElement>): Promise<void> {

  if (!drafts.get(selectedChannel?.id || NaN))
    return;
  const draft = drafts.get(selectedChannel?.id || NaN) as unknown as InputDraft;

  // Check if it is enter
  if (data.key === "Enter" && data.shiftKey === false && selectedChannel !== null) {
    data.currentTarget.value = "";
    logger.log("Sending message");

    // Send the message
    try {
      await client.channel(selectedChannel.id).messages.create(draft.content);
      draft.content = "";
    } catch (err) {
      ShowError(err as Error);
    }

    return;
  }

  // Otherwise just update the draft
  if (drafts?.get(selectedChannel?.id || 0))
    (drafts.get(selectedChannel?.id || 0) as unknown as InputDraft).content = data.currentTarget.value;
}

export function initialiseChannel(channelId: number) {
  if (!drafts.has(channelId))
    drafts.set(channelId, {
      content: "",
    });
  
  updateInputArea(channelId);
}