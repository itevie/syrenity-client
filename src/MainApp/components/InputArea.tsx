import { useEffect, useRef } from "react";
import { selectedChannel } from "./ChannelContentContainer";

export default function InputArea() {
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        inputRef.current?.addEventListener("keyup", async event => {
            // Check if channel is loaded
            if (!selectedChannel) return;

            // Check for sending
            if (!event.shiftKey && event.key === "Enter") {
                let contents = inputRef.current?.value as string;
                (inputRef.current as any).value = "";
                await selectedChannel.messages.create({
                    content: contents.trim(),
                });
            }
        });
    }, []);

    return (
        <div className="input-area">
            <label className="currently-typing"></label>
            <div className="input-area-content">
                <textarea 
                    ref={inputRef}
                    rows={1}
                    className="input-area-content-input"
                    style={{resize: "none"}}
                />
            </div>
        </div>
    );
}