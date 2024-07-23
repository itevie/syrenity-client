import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { Children } from "../../util";
import axios from "axios";
import { baseUrl } from "../../util/urlManager";

export default function InfoPage({ children }: { children: Children }) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try {
                let value = await axios.get(baseUrl + "/api/ping", {
                    headers: {
                        Authorization: "Token " + localStorage.getItem("token")
                    }
                });
                console.log(value);
                setIsLoggedIn(true);
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    return (
        <div className="info-page">
            <div className="info-page-nav-bar">
                <img className="info-page-nav-bar-logo" src="/images/logos/no_shape_logo.png" />
                <label className="info-page-nav-bar-title" onClick={() => window.location.href = "/"}>Syrenity</label>
                <div className="info-page-nav-bar-middle"></div>
                <Button onClick={() => window.location.href = (isLoggedIn ? "/channels" : "/login")}>{isLoggedIn ? "Open Syrenity" : "Login"}</Button>
            </div>
            <div className="info-page-contents">
                {children}
            </div>
        </div>
    );
}