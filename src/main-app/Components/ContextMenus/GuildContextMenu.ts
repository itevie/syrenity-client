import { displayContextMenu } from "../../../Components/ContextMenus/ContextMenu";
import ShowConfirm from "../../../Modals/Confirm";
import client from "../../Client";
import { ExtractedMemberData, Permissions } from "syrenity-api-client";
import { _reloadGuildBar } from "../ServerBar";

export default async function showGuildContextMenu(id: number, members: {[key: string]: ExtractedMemberData}, event: React.MouseEvent<HTMLElement, MouseEvent>) {

  displayContextMenu({
    event,
    func: async () => {
      const guild = await client.guild(id).fetch();
      let currentMember: ExtractedMemberData | undefined = members[`${id}:${client.currentUser.id}`];
      if (!currentMember) currentMember = 
        (await guild.members.fetchList())
        .find(x => x.user.id === client.currentUser.id)
        ?.extractData();
        
      const manageChannels = Permissions.bitfieldHasPermission(currentMember?.permissionsBitfield || 0, "MANAGE_CHANNELS");
      const createInvite = Permissions.bitfieldHasPermission(currentMember?.permissionsBitfield || 0, "CREATE_INVITE");

      return [
        { 
          type: "button", 
          name: "Create Invite",
          hidden: !createInvite,
          click: async () => {
            // Create invite
            const invite = await guild.createInvite();
            alert(invite);
          }
        },
        { type: "seperator" },
        {
          type: "button",
          name: "Create Channel",
          hidden: !manageChannels,
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