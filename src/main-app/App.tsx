import '../styles/main.css';
import "../styles/guild-bar.css";
import "../styles/main-content.css";
import "../styles/channel-bar.css";
import "../styles/user-profile.css";
import client, { startClient } from "./Client";
import { useEffect, useState } from 'react';
import Main from './Main';
import ShowError from '../Modals/Error';
import UserProfileViewer, { hideViewer } from './Components/UserProfileViewer';

function App() {
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    client.on("ready", () => {
      console.log("ready");
      setReady(true);
    });
  }, []);

  client.on("error", error => {
    console.log(error);
    // Check if it is a token error
    if (error.message.includes("token")) {
      window.location.href = "/login";
    } else {
      ShowError(error);
    }
  });

  startClient();

  document.addEventListener("click", () => {
    // Hide stuff
    hideViewer();
  });

  return (
    <>
      {ready ? <Main></Main> : <label>Loading...</label>}
      <UserProfileViewer></UserProfileViewer>
    </>
  );
}

export default App;
