import { HTMLAttributes, useEffect, useState } from "react";
import ChannelBarContainer from "./components/ChannelBarContainer";
import MainContent from "./components/MainContent";
import ServerBar from "./components/ServerBar";

export let setCloseState: (on: boolean) => void = () => { };

export default function Main(props: HTMLAttributes<HTMLElement>) {
    const [closeState, _setCloseState] = useState<string>("");

    useEffect(() => {
        setCloseState = state => {
            if (state === true) {
                _setCloseState("fade-out");
            } else {
                _setCloseState("");
                setTimeout(() => {
                    _setCloseState("fade-out-reverse");

                    setTimeout(() => {
                        _setCloseState("");
                    }, 200);
                }, 1);
            }
        }
    }, []);

    return (
        <div className="main-bg">
            <div className={"main-container " + (closeState)} {...props}>
                <ServerBar />
                <div className="main-part">
                    <ChannelBarContainer />
                    <MainContent />
                </div>
            </div>
        </div>
    );
}