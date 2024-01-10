import { displayContextMenu } from "../../../Components/ContextMenus/ContextMenu";
import ShowConfirm from "../../../Modals/Confirm";
import client from "../../Client";
import { _reloadGuildBar } from "../ServerBar";

export default function showGuildContextMenu(id: number, attachTo: HTMLElement) {
  displayContextMenu({
    attachTo: attachTo,
    func: async () => {
      const guild = await client.guild(id).fetch();

      return [
        { 
          type: "button", 
          name: "Create Invite",
          click: async () => {
            // Create invite
            const invite = await guild.createInvite();
            alert(invite);
          }
        },
        { type: "seperator", },
        { 
          type: "button", 
          name: `Leave ${guild.name}`, 
          danger: true,
          click: () => {
            ShowConfirm({
              question: `Are you sure you want to leave ${guild.name}?`,
              confirm: async () => {
                await guild.leave();
                _reloadGuildBar();
              }
            });
          }
        },
        { type: "seperator" },
        { type: "button", name: "Copy Server ID", icon: "copy" }
      ];
    }
  });
}