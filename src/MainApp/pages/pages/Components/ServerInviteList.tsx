import { useEffect, useState } from "react";
import { Server } from "syrenity/build";
import Invite from "syrenity/build/structures/Invite";
import { useAppSelector } from "../../../reduxStore";
import Button from "../../../../components/Button";
import { showErrorModal } from "../../../../util/modalPresets";

export default function ServerInviteList({ server }: { server: Server }) {
    let [invites, setInvites] = useState<Invite[]>([]);
    const users = useAppSelector(state => state.users);

    useEffect(() => {
        (async () => {
            let invites = await server.invites.fetchAll();
            setInvites(invites);
        })();
    }, [server]);

    async function deleteInvite(invite: Invite) {
        await invite.delete();
        showErrorModal("Deleted!");
    }

    return (
        <div>
            <table>
                <tr>
                    <th>Inviter</th>
                    <th>Invite Code</th>
                    <th>Uses</th>
                    <th>Expires</th>
                    <th>Actions</th>
                </tr>
                {
                    invites.map(x => <tr>
                        <td>{users[x.createdBy].username}#{users[x.createdBy].discriminator}</td>
                        <td><code>{x.id}</code></td>
                        <td>{x.uses} / {x.maxUses ?? "∞"}</td>
                        <td>{x.expiresIn ?? "∞"}</td>
                        <td><Button onClick={() => deleteInvite(x)}>Delete</Button></td>
                    </tr>)
                }
            </table>
        </div>
    );
}