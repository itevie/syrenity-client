import { Server } from "syrenity/build";
import { EventOrElement } from "../../../util";
import { showContextMenu } from "../../../components/ContextMenuManager";
import showServerSettings from "../../pages/pages/serverSettings";
import { showErrorModal } from "../../../util/modalPresets";

export default function showServerContextMenu(server: Server, attachTo: EventOrElement) {
    showContextMenu({
        where: attachTo,
        items: [
            {
                type: "button",
                label: `Edit ${server.name}`,
                icon: "edit",
                onClick: () => {
                    showServerSettings(server);
                }
            },
            {
                type: "button",
                label: "Create Invite",
                icon: "mail",
                onClick: async () => {
                    let invite = await server.invites.create();
                    showErrorModal(invite.id);
                }
            },
            {
                type: "divider"
            },
            {
                type: "button",
                label: `Leave ${server.name}`,
                danger: true,
                icon: "leave",
                onClick: async () => {

                }
            },
            {
                type: "divider"
            },
            {
                type: "button",
                label: "Copy Server ID",
                icon: "copy",
                onClick: () => {
                    window.navigator.clipboard.writeText(server.id.toString());
                }
            }
        ]
    })
}