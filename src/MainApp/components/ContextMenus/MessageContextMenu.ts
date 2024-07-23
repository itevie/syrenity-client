import { Message } from "syrenity/build";
import { showContextMenu } from "../../../components/ContextMenuManager";
import { EventOrElement } from "../../../util";

export default function showMessageContextMenu(message: Message, attachTo: EventOrElement): void {
    showContextMenu({
        where: attachTo,
        items: [
            {
                type: "button",
                label: "Pin Message",
                icon: "pin",
                hidden: message.isPinned,
                onClick: async () => {
                    await message.pin();
                }
            },
            {
                type: "button",
                label: "Unpin Message",
                icon: "unpin",
                hidden: !message.isPinned,
                onClick: async () => {
                    await message.unpin();
                }
            },
            {
                type: "button",
                label: "Delete Message",
                danger: true,
                icon: "delete",
                onClick: async () => {
                    await message.delete();
                }
            },
            {
                type: "divider"
            },
            {
                type: "button",
                label: "Copy Text",
                icon: "copy",
                onClick: () => {
                    window.navigator.clipboard.writeText(message.content);
                }
            },
            {
                type: "divider"
            },
            {
                type: "button",
                label: "Copy Message ID",
                icon: "copy",
                onClick: () => {
                    window.navigator.clipboard.writeText(message.id.toString());
                }
            }
        ]
    });
}