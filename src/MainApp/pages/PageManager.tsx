import { useEffect, useState } from "react";
import { setCloseState } from "../Main";

let pageQueue: JSX.Element[] = [];
export let addPage: (page: JSX.Element) => void = () => { };
export let closePage: () => void = () => { };

export default function PageManager() {
    const [currentPage, setCurrentPage] = useState<JSX.Element | null>(null);
    const [closeState, _setCloseState] = useState<string>("");

    useEffect(() => {
        addPage = page => {
            pageQueue.push(page);
            updatePage();
        }

        closePage = () => {
            pageQueue.pop();
            updatePage();
        }

        document.addEventListener("DOMContentLoaded", () => {

        })

        function updatePage() {
            if (pageQueue.length === 0) {
                _setCloseState("");
                setCloseState(false);
                setTimeout(() => {
                    _setCloseState("fade-in-reverse");
                    setTimeout(() => {
                        setCurrentPage(null);
                    }, 200);
                }, 1);
            } else {
                setCloseState(true);
                _setCloseState("fade-in");
                setCurrentPage(pageQueue[pageQueue.length - 1]);
            }
        }

        document.addEventListener("keyup", (e) => {
            if (pageQueue.length > 0 && e.code === "Escape") {
                pageQueue.pop();
                updatePage();
            }
        });
    }, []);

    return (
        <div className={"page-container " + closeState} style={{ display: currentPage === null ? "none" : "block" }}>
            {currentPage}
        </div>
    );
}