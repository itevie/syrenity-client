import TabbedPage from "../TabbedPage";
import TabbedPageHeader from "../TabbedPageHeader";
import TabbedPageItem from "../TabbedPageItem";
import { addPage } from "../PageManager";
import { useState } from "react";
import { shortcuts } from "../../shortcutManager";
import Button from "../../../components/Button";
import showUploadFileModal from "../../../modals/uploadFile";
import { showConfirmModal, showErrorModal } from "../../../util/modalPresets";
import { client } from "../../App";
import { useAppSelector } from "../../reduxStore";
import UserProfilePicture from "../../components/UserProfilePicture";
import { User } from "syrenity/build";
import ToolTip from "../../../components/ToolTip";
import PageSetting from "../PageSetting";

function SettingsPage() {
    let [selectedItem, setSelectedItem] = useState<string>("my-account");
    const users = useAppSelector(state => state.users);

    function _set(what: string) {
        console.log(what);
        setSelectedItem(what);
    }

    async function changePfp() {
        let file = await showUploadFileModal();
        if (!file) return;

        client.user?.edit({
            avatar: file
        }).then(() => {
            showErrorModal("Updated!");
        });
    }

    function logout() {
        showConfirmModal("Are you sure you want to logout?", {
            yesCallback: () => {
                localStorage.setItem("token", "");
                window.location.reload();
            }
        });
    }

    return (
        <TabbedPage>
            <>
                <TabbedPageHeader label="User Settings " />
                <TabbedPageItem onClick={() => _set("my-account")} label="My Account" />
                <TabbedPageItem onClick={() => _set("privacy")} label="Priacy & Safety" />
                <TabbedPageHeader label="App Settings" />
                <TabbedPageItem onClick={() => _set("appearance")} label="Appearance" />
                <TabbedPageItem onClick={() => _set("keybinds")} label="Keybinds" />
                <TabbedPageHeader label="Quick Actions" />
                <TabbedPageItem onClick={logout} label="Logout" />
            </>
            <>
                {
                    {
                        "my-account": (
                            <>
                                <h1>My Account</h1>
                                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                    <ToolTip content="Click me to change your pfp!" flyout="right">
                                        <UserProfilePicture onClick={changePfp} user={client.user as User} style={{ width: "100px", height: "100px" }} />
                                    </ToolTip>
                                    <h1>{users[(client.user as User).id].username}#{users[(client.user as User).id].discriminator}</h1>
                                </div>
                                <PageSetting label="Change Username" icon="person" onClick={() => alert("placeholder")} />
                                <PageSetting label="Change Email" icon="mail" onClick={() => alert("placeholder")} />
                                <PageSetting label="Re-roll Discriminator" icon="tag" onClick={() => alert("placeholder")} />
                            </>
                        ),
                        "appearance": (
                            <>
                                <h1>Appearance</h1>
                                <p>Change how the app looks!</p>
                                <PageSetting label="Change Accent Color" icon="palette" onClick={() => alert("placeholder")} />
                            </>
                        ),
                        "keybinds": (
                            <>
                                <h1>Keybinds</h1>
                                <p>Here is a list of keybinds within the app</p>
                                {
                                    Object.keys(shortcuts).map(shortcut => (
                                        <>
                                            <b>{shortcut}</b> - <code>{shortcuts[shortcut].shortcut}</code><br />
                                            <label>{shortcuts[shortcut].description}</label><br /><br />
                                        </>
                                    ))
                                }
                            </>
                        )
                    }[selectedItem]
                }
            </>
        </TabbedPage >
    );
}

export default function showSettingsPage() {
    addPage(
        <SettingsPage />
    );
}
