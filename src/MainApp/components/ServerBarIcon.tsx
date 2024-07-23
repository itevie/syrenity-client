import { Server } from "syrenity/build";
import ProfilePicture from "../../components/ProfilePicture";
import initialsToAvatar from "../../util/initialsToAvatar";
import { HTMLAttributes } from "react";
import showServerContextMenu from "./ContextMenus/ServerContextMenu";

export default function ServerBarIcon(props: { server: Server } & HTMLAttributes<HTMLElement>) {
    let src = props.server.avatar;

    if (!src) {
        src = initialsToAvatar(props.server.name);
    }

    return (
        <ProfilePicture
            avatar={src}
            className="server-bar-icon"
            onContextMenu={(e) => showServerContextMenu(props.server, e)}
            onError={target => { (target.target as HTMLImageElement).src = initialsToAvatar(props.server.name) }}
            {...props}
        />
    )
}