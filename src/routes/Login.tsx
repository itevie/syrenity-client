import { useEffect, useRef } from "react";
import Button from "../components/Button";
import Center from "../components/Center";
import ComplicatedInput from "../components/ComplicatedInput";
import Modal from "../components/Modal";
import ModalContent from "../components/ModalContent";
import SideBySide from "../components/SideBySide";
import ModalPage from "./components/ModalPage";
import axios from "axios";
import { showErrorModal } from "../util/modalPresets";
import { baseUrl } from "../util/urlManager";

export default function Login() {
    const emailElement = useRef<HTMLInputElement>(null);
    const passwordElement = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Check if running on server
        axios.get("/api/ping").catch((err) => {
            //showErrorModal(`You are running on the development client, please switch to server client to login.`);
        });
    }, []);

    async function login() {
        const email = emailElement.current?.value as string;
        const password = passwordElement.current?.value as string;

        axios.post("/auth/password", {
            email,
            password,
        }).catch(error => {
            console.log(error.response.data);
        }).then((res) => {
            console.log(res);
            showErrorModal("Logged in!");
            setTimeout(() => {
                //window.location.href = "/";
            }, 1000);
        });
    }

    async function loginWithToken() {
        let token = prompt("Enter token: ") as string;

        // Validate token
        try {
            let result = await axios.get(baseUrl + "/api/ping", { headers: { Authorization: `Token ${token}` } });
            console.log(result);
            if (result?.data?.user) {
                localStorage.setItem("token", token);
                window.location.href = "/channels";
            }
        } catch {
            showErrorModal("An invalid token was provided");
        }
    }

    return (
        <>
            <ModalPage />
            <Center>
                <Modal big={true}>
                    <ModalContent>
                        <h1>Login to Syrenity</h1>
                        <p>Let's get you logged in to your Syrenity account.</p>
                        <ComplicatedInput
                            inputRef={emailElement}
                            type="email"
                            name="Email"
                            placeholder="example@example.com" />
                        <ComplicatedInput
                            inputRef={passwordElement}
                            type="password"
                            name="Password" />
                    </ModalContent>
                    <SideBySide>
                        <Button onClick={login} jumbo={true}>Login</Button>
                    </SideBySide>
                    <a href="#" onClick={loginWithToken}>Login with token</a>
                </Modal>
            </Center>
        </>
    );
}