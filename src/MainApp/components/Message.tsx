import { Message as SyrenityMessage } from "syrenity/build";
import "../../styles/message.css";
import UserProfilePicture from "./UserProfilePicture";
import { showContextMenu } from "../../components/ContextMenuManager";
import React, { useEffect, useState } from "react";
import showMessageContextMenu from "./ContextMenus/MessageContextMenu";
import { useAppSelector } from "../reduxStore";
import MaterialIcon from "../../components/MaterialIcon";
import { client } from "../App";

export default function Message({ message }: { message: SyrenityMessage }) {
    const users = useAppSelector(state => state.users);
    const [systemData, setSystemData] = useState<{ icon: string, element: JSX.Element }>({ icon: "leave", element: <></> });

    let _showContextMenu = (div: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        showMessageContextMenu(message, div);
    };

    useEffect(() => {
        (async () => {
            if (message.isSystem) {
                switch (message.systemType) {
                    case "MessagePinned":
                        let data = JSON.parse(message.content);
                        let actioner = await client.users.fetch(data.pinned_by);
                        setSystemData({
                            icon: "pin",
                            element: <label><b>{actioner.username}</b> pinned a message!</label>
                        });
                }
            }
        })();
    }, [message]);

    return (
        <div className="message-container" onContextMenu={(sender) => _showContextMenu(sender)}>
            {
                message.isSystem
                    ? (
                        <div className="message-system-container">
                            <MaterialIcon icon={systemData.icon} />
                            {systemData.element}
                            <small className="message-header-timestamp">
                                {message.createdAt.toLocaleDateString()}
                                {message.isPinned ? " (Pinned)" : ""}
                            </small>
                        </div>
                    )
                    : (
                        <>
                            <UserProfilePicture user={message.author} />
                            <div className="message-content-container">
                                <div className="message-header">
                                    <label className="message-header-author">
                                        {users[message.author.id].username || "Loading..."}
                                    </label>

                                    <small className="message-header-timestamp">
                                        {message.createdAt.toLocaleDateString()}
                                        {message.isPinned ? " (Pinned)" : ""}
                                    </small>
                                </div>

                                <div className="message-content">
                                    {message.content}
                                </div>
                            </div>
                        </>
                    )
            }
        </div>
    );
}