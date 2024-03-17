import { useEffect, useRef, useState } from "react";
import * as Syrenity from "syrenity-api-client";
import client from "../Client";
import Message from "./Message";
import { selectedChannel } from "../UI/ChannelLoader";
import Logger from "../../Logger";

interface ChannelContentProps {
  channelId: number;
}

interface OnEventData {
  EDIT: [message: Syrenity.Message];
  DELETE: [id: number];
}

interface MessageWithKey extends Syrenity.Message {
  key: string;
}

const logger = new Logger("channel-content");
const listeners: {[key: number]: (newMessage: Syrenity.Message | "scrollToBottom") => void} = {};
export const onEvent: {[key: number]: 
  <T extends keyof OnEventData>(type: T, ...args: OnEventData[T]) => void;
} = {};
let userHasScrolled: number[] = []; 
let oldestMessages: {[key: number]: number} = {};
export let getLatestByUser: {[key: number]: () => (Syrenity.Message | undefined)} = {};
let lastScroll = 0;

export default function ChannelContent(props: ChannelContentProps) {
  const [messages, setMessages] = useState<MessageWithKey[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [temp, setTemp] = useState<number>(0);

  // Function to scroll the container to the bottom
  // if the user hasn't scrolled upwards.
  function scrollToBottom(id: number, force: boolean = false) {
    const parent = scrollRef?.current?.parentElement as HTMLElement;
    if (!parent) return;

    // Check if the user has scrolled up so it should ignore the scroll
    if ((1000 - (parent.scrollHeight - parent.scrollTop) < 0) && userHasScrolled.includes(id) && !force)
      return;

    // Scroll
    parent.scrollTop = parent.scrollHeight + 100;
  }

  // This effect is like idk
  useEffect(() => {
    // Initially load 20 new messages
    (async () => {
      const messages = await client.channel(props.channelId).messages.fetch(20, null) as MessageWithKey[];
      if (!messages[0]) return oldestMessages[props.channelId] = -1;
      oldestMessages[props.channelId] = messages[0].id;
      for (const msg of messages) msg.key = Math.random().toString();
      setMessages(messages);
    })();

    // Listen for when a new message has been sent
    // or a scrollToBottom has been requested
    listeners[props.channelId] = async message => {
      if (message === "scrollToBottom") {
        scrollToBottom(props.channelId);
      } else {
        let newMessage: MessageWithKey = message as MessageWithKey;
        newMessage.key = Math.random().toString();
        setMessages(prev => [...prev, newMessage]);
      } 
    }
    
    // Listen for when the user scrolls upwards
    // so it can loads new messages
    const parent = scrollRef?.current?.parentElement as HTMLElement;
    parent.addEventListener("wheel", async () => {
      // Check if it is at the top of the thing
      if (parent.scrollTop < 100) {
        // Load more messages
        const oldest = oldestMessages[props.channelId];

        // Check if it should actually fetch them
        if (oldest && (1000 - (Date.now() - lastScroll) < 0)) {
          logger.log(`(channel ${props.channelId}): Loading new messages, oldest: ${oldest}`);

          // Update last scroll
          lastScroll = Date.now();
          const oldHeight = parent.scrollHeight;

          // Fetch new messages
          const newMessages = await client.channel(props.channelId).messages.fetch(20, oldest) as MessageWithKey[];

          // Check if user has reached the beginning of the channel
          if (!newMessages[0]) return oldestMessages[props.channelId] = -1;
         for (const msg of newMessages) msg.key = Math.random().toString();

          // Update contents
          oldestMessages[props.channelId] = newMessages[0].id;
          setMessages(old => [...newMessages, ...old]);

          // Wait for the messages to load then fix the scroll
          setTimeout(() => {
            parent.scrollTop = parent.scrollHeight - oldHeight;
          }, 50);
        }
      }
    });

    // Scroll to bottom on page load
    if (!(props.channelId in oldestMessages)) {
      scrollToBottom(props.channelId, true);
      scrollRef?.current?.parentElement?.addEventListener("wheel", () => {
        userHasScrolled.push(props.channelId);
      }, {once: true});
    }
  }, [props.channelId]);

  // This one just updates every render so it goes all the way to the bottom
  useEffect(() => {
    scrollToBottom(props.channelId);

    onEvent[props.channelId] = (type, data) => {
      if (type === "DELETE") {
        setMessages(prev => prev.filter(x => x.id !== data));
      } else if (type === "EDIT") {
        setMessages(prev => prev.map(x => {
          if (x.id === (data as Syrenity.Message).id) {
            let message = (data as Syrenity.Message) as MessageWithKey;
            message.key = Math.random().toString();
            return message;
          } 
          return x;
        }));
      }
    }

    getLatestByUser[props.channelId] = () => {
      return (messages as any).findLast((x: MessageWithKey) => x.author.id === client.currentUser.id);
    }
  }, [props.channelId, messages]);

  return <div ref={scrollRef}>
    {messages.map((message, index) => {
      return (
        <Message
          key={`message-${message.key}`}
          message={message}
          isGrouped={
            (
              index > 0
              && message.author.id === messages[index - 1].author.id
              && (
                (60000 * 5)
                - (message.createdAt.getTime() - messages[index - 1].createdAt.getTime())
                > 0
              )
            )
          }
          />
      )
    })}
  </div>
}

export function loadMessage(message: Syrenity.Message): void {
  // Check if there is a listener for this channel
  if (listeners[message.channel.id])
    listeners[message.channel.id](message);
}

export function scrollToBottom() {
  if (selectedChannel)
    listeners[selectedChannel.id]("scrollToBottom");
}
