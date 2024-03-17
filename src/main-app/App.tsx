/* eslint-disable react-hooks/exhaustive-deps */
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
import { Provider, useDispatch } from 'react-redux';
import reduxStore, { useAppSelector } from './reduxStore';
import PageManager from './Components/PageManager';
import { addUser } from './stores/users';
import { addMember } from './stores/member';
import { onEvent } from './Components/ChannelContent';
import EditMessageModal from './modals/EditMessage';
import GuildSettings from './pages/guildSettings';

function AppContainer() {
  document.addEventListener("click", () => {
    // Hide stuff
    hideViewer();
  });

  return (
    <Provider store={reduxStore}>
      <App />
    </Provider>
  );
}

export function App() {
  const [ready, setReady] = useState<boolean>(false);
  const settings = useAppSelector(state => state.settings);
  const dispatch = useDispatch();

  useEffect(() => {
    client.on("ready", (data) => {
      dispatch(addUser(data.user.extractData()));
      console.log("ready");
      setReady(true);
    });

    client.on("userClassCreation", user => {
      dispatch(addUser(user.extractData()));
    });

    client.on("memberClassCreation", member => {
      dispatch(addMember(member.extractData()));
    });

    client.on("messageDelete", data => {
      onEvent[data.channel.id]("DELETE", data.messageId);
    });

    client.on("messageUpdate", message => {
      onEvent[message.channel.id]("EDIT", message);
    });
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--color-accent-0", settings.accent);
  });

  client.on("error", error => {
    // Check if it is a token error
    if (error.message.includes("token")) {
      window.location.href = "/login";
    } else {
      ShowError(error);
    }
  });

  startClient();

  return (
    <div>
      {ready ? (
        <>
          <Main></Main>
          <UserProfileViewer></UserProfileViewer>
          <PageManager></PageManager>
          <EditMessageModal></EditMessageModal>
        </>
      ) : <label>Loading...</label>}
    </div>
  );
}

export default AppContainer;
