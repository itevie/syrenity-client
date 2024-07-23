// ----- Actual things -----
import React, { useEffect, useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
import * as syrenity from "syrenity/build";
import axios from 'axios';
import { addUser } from './stores/users';
import store from './reduxStore';
import "./shortcutManager";

// ----- Components -----
import Main from './Main';
import Loader from './Loader';
import { showConfirmModal, showErrorModal } from '../util/modalPresets';
import { channelContentListeners } from './components/ChannelContent';
import PageManager from './pages/PageManager';

// ----- Styles -----
import "../styles/main/channel-bar.css";
import "../styles/main/fullscreen-loader.css";
import "../styles/main/input-area.css";
import "../styles/main/main-content.css";
import "../styles/main/server-bar.css";

export let client: syrenity.Client;
let token: string | null = null;

export default function App() {
    return (
        <Provider store={store}>
            <_App />
        </Provider>
    )
}

export function _App() {
    const [ready, setReady] = useState<boolean>(false);
    const [disconnected, setDisconnected] = useState<boolean>(false);
    const dispatch = useDispatch();
    let [element, setElement] = useState<JSX.Element | null>(null);

    function login() {
        client = new syrenity.Client();

        client.on("debug", console.log);
        client.on("ready", async () => {
            setReady(true);
            //let channel = await client.channels.fetch(114);
            //setElement(<MainContent channel={channel} />);
        });

        client.on("disconnect", () => {
            setDisconnected(true);
        });

        client.on("reconnect", () => {
            setDisconnected(false);
        });

        client.on("messageCreate", message => {
            if (channelContentListeners[message.channel.id]) {
                channelContentListeners[message.channel.id]("c", message);
            }
        });

        client.on("messageDelete", (message, channel) => {
            if (channelContentListeners[channel]) {
                channelContentListeners[channel]("d", message);
            }
        });

        client.on("messageUpdate", message => {
            if (channelContentListeners[message.channel.id]) {
                channelContentListeners[message.channel.id]("u", message);
            }
        });

        client.on("httpError", error => {
            let errorText: string = error.message;

            console.log("HTTP Error:", { ...error });

            switch (error.code) {
                case "MissingPermissions":
                    errorText = `You need the following permissions to do that: ${error.getData<"MissingPermissions">().bitfieldString.join(", ")}`;
                    break;
            }

            showErrorModal(errorText);
        });

        client.on("userClassCreation", user => {
            dispatch(addUser(user));
        });

        client.on("userUpdate", user => {
            dispatch(addUser(user.oldData));
        });

        client.connect(token as string);
    }

    useEffect(() => {
        (async () => {
            if (localStorage.getItem("token")) {
                token = localStorage.getItem("token");
                return login();
            }

            const result = await axios.get("/api/users/@me").catch(() => {
                showErrorModal("You are not logged in - redirecting");
                setTimeout(() => {
                    window.location.href = "/login";
                }, 1000);
                /*showConfirmModal(
                    `You are not logged in. You may either be using a developmental client, or are actually not logged in. Would you like to use a token?`,
                    {
                        yesCallback: () => {
                            const _token = prompt("Enter token:") ?? "";
                            token = _token;
                            localStorage.setItem("token", _token);
                            login();
                        },
                        noCallback: () => {
                            login();
                        }
                    }
                )*/
            });

            if (result) {
                login();
            }
        })();
    }, []);

    return (
        <>
            {
                ready
                    ?
                    <>
                        <Main />
                        <PageManager />
                        {/*<div style={{ backgroundColor: "black", position: "absolute", top: "0px", left: "0px", width: "300px", height: "300px" }}>
                            {element ? element : <></>}
                        </div>*/}
                    </>
                    : <Loader />
            }
            {
                disconnected ? <Loader /> : <></>
            }
        </>
    );
}


