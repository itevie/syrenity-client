import { useState } from "react";
import { addPage } from "../PageManager";
import TabbedPage from "../TabbedPage";
import TabbedPageItem from "../TabbedPageItem";
import { Server } from "syrenity/build";
import TabbedPageHeader from "../TabbedPageHeader";
import ServerInviteList from "./Components/ServerInviteList";

function ServerSettings({ server }: { server: Server }) {
    const [currentPage, setCurrentPage] = useState<string>("overview");

    function _set(what: string) {
        setCurrentPage(what);
    }

    return (
        <TabbedPage>
            <>
                <TabbedPageItem label="Overview" onClick={() => _set("overview")} />
                <TabbedPageHeader label="Resources" />
                <TabbedPageItem label="Invites" onClick={() => _set("invites")} />
            </>
            <>
                {
                    {
                        "overview": (
                            <h1>{server.name} - Overview</h1>
                        ),
                        "invites": (
                            <>
                                <h1>{server.name} - Invites</h1>
                                <ServerInviteList server={server} />
                            </>
                        )
                    }[currentPage]
                }
            </>
        </TabbedPage>
    )
}

export default function showServerSettings(server: Server) {
    addPage(<ServerSettings server={server} />);
}