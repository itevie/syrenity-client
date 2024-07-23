import { useEffect, useRef, useState } from "react";
import { Channel, Message as SyrenityMessage } from "syrenity/build";
import Message from "./Message";

const oldMessages: { [key: number]: number } = {};
let lastScroll: number = 0;
export const channelContentListeners: { [key: number]: (type: "d" | "c" | "u", message: SyrenityMessage | number) => void } = {};

export default function ChannelContent(props: { channel: Channel }) {
    const [messages, setMessages] = useState<SyrenityMessage[]>([]);
    const [reachedTop, setReachedTop] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current?.parentElement?.parentElement as HTMLElement;
        (async () => {
            let messages = (await props.channel.messages.fetch({
                amount: 20,
                orderBy: "ascending",
            })).reverse();

            setTimeout(() => {
                container.scrollTop = container.scrollHeight;
                container.scrollTo({
                    top: container.scrollHeight
                });
            }, 2000);

            // Check if any messages were found
            setMessages([]);
            if (messages.length === 0) return oldMessages[props.channel.id] = -1;

            oldMessages[props.channel.id] = messages[0].id;
            setReachedTop(messages.length < 19);
            setMessages(messages);
            setTimeout(() => {
                container.scrollTop = container.scrollHeight;
            }, 100);
        })();

        channelContentListeners[props.channel.id] = (type, message) => {
            if (type === "d") {
                setMessages(old => {
                    let index = old.findIndex(x => x.id === message as number);
                    old.splice(index, 1);
                    return [...old];
                });
            } else if (type === "c") {
                setMessages(old => [...old, message as SyrenityMessage]);
                setTimeout(() => {
                    container.scrollTop = container.scrollHeight;
                }, 100);
            } else if (type === "u") {
                setMessages(old => {
                    let index = old.findIndex(x => x.id === (message as SyrenityMessage).id);
                    old[index] = message as SyrenityMessage;
                    return [...old];
                })
            }
        }

        container.addEventListener("wheel", async event => {
            // Check if scrolled to top
            if (container.scrollTop < 200) {
                const oldest = oldMessages[props.channel.id] || -1;

                // Check if it should actually load them
                if (oldest && (1000 - (Date.now() - lastScroll)) < 0) {
                    lastScroll = Date.now();
                    const oldHeight = container.scrollHeight;

                    // Fetch new messages
                    const messages = (await props.channel.messages.fetch({
                        amount: 20,
                        startAt: oldest,
                    })).reverse();

                    if (messages.length === 0) {
                        return oldMessages[props.channel.id] = -1;
                    }

                    // Update contents
                    oldMessages[props.channel.id] = messages[0].id;
                    setMessages(old => [...messages, ...old]);

                    // Timer
                    setTimeout(() => {
                        container.scrollTop = container.scrollHeight - oldHeight;
                    }, 50);
                }
            }
        });
    }, [props.channel, reachedTop]);

    return (
        <div ref={containerRef}>
            {reachedTop ? <h1>You've reach the beginning of #{props.channel.name}</h1> : <></>}
            {
                messages.map(x => (
                    <Message key={x.id} message={x} />
                ))
            }
        </div>
    );
}