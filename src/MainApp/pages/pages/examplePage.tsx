import { useState } from "react";
import { addPage } from "../PageManager";
import TabbedPage from "../TabbedPage";
import TabbedPageItem from "../TabbedPageItem";

export default function _________() {
    addPage(function ServerSettings() {
        const [currentPage, setCurrentPage] = useState<string>("overview");

        function _set(what: string) {
            setCurrentPage(what);
        }

        return (
            <TabbedPage>
                <>
                    <TabbedPageItem label="Overview" onClick={() => _set("ovewview")} />
                </>
                <>
                    {
                        {
                            "overview": (
                                <h1>Overview</h1>
                            )
                        }[currentPage]
                    }
                </>
            </TabbedPage>
        )
    }());
}