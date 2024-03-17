import { displayContextMenu } from "../../../Components/ContextMenus/ContextMenu";
import { ExtractedMemberData, Message } from "syrenity-api-client";
import Confirm from "../../../Modals/Confirm";
import client from "../../Client";

export default function showMessageContextMenu(message: Message, member: ExtractedMemberData, attachTo: HTMLElement) {
  /*displayContextMenu({
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
        icon: "pin",
      },
      {
        type: "button",
        name: "Delete Message",
        danger: true,
        icon: "delete",
        hidden: message.author.id === client.currentUser.id,
        click: () => {
          Confirm({
            question: "Are you sure you want to delete this message?",
            confirm: async () => {
              alert("delete");
            }
          });
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
  });*/
}
