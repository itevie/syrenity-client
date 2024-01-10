import { displayContextMenu } from "../../../Components/ContextMenus/ContextMenu";
import { Message } from "../../Syrenity";

export default function showMessageContextMenu(message: Message, attachTo: HTMLElement) {
  displayContextMenu({
    attachTo,
    items: [
      { 
        type: "button",
        name: "Copy Text",
        icon: "copy",
        click: () => {
          window.navigator.clipboard.writeText(message.content);
        }
      },
      { type: "seperator" },
      {
        type: "button",
        name: "Edit Message",
        icon: "edit"
      },
      {
        type: "button",
        name: "Pin Message",
        icon: "pin"
      },
      {
        type: "button",
        name: "Delete Message",
        danger: true,
        icon: "delete",
        click: async () => {

        }
      },
      { type: "seperator" },
      {
        type: "button",
        name: "Copy Message ID",
        icon: "copy",
        click: () => {
          window.navigator.clipboard.writeText(message.id.toString());
        }
      }
    ]
  });
}