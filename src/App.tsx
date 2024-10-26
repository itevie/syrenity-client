import React, { useEffect, useState } from 'react';
import { Client } from "./syrenity-client/index";
import Column from './dawn-ui/components/Column';
import FullPage from './dawn-ui/components/FullPage';
import Server from './syrenity-client/structures/Server';
import Icon from './dawn-ui/components/Icon';
import Row from './dawn-ui/components/Row';
import Channel from './syrenity-client/structures/Channel';
import Button from './dawn-ui/components/Button';
import Message from './syrenity-client/structures/Message';
import MessageC from './components/Message';

let client: Client;

function App() {
  const [servers, setServers] = useState<Server[]>([]);
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    client = new Client({
      baseUrl: "http://localhost:3000"
    });

    client.on("debug", msg => {
      console.log(msg);
    });

    client.on("ready", async user => {
      const s = await user.fetchServers();
      setServers(s);

      let path = window.location.pathname.match(/channels\/([0-9]+)\/([0-9]+)/);
      if (!path) return;
      let server = parseInt(path[1]);
      let channel = parseInt(path[2]);

      loadServer(server);
      loadChannel(channel);
    });

    client.on("messageCreate", msg => {
      setMessages(old => {
        return [...old, msg];
      });
    });

    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }

    client.connect(localStorage.getItem("token") as string);
  }, []);

  async function loadServer(id: number) {
    let server = await client.servers.fetch(id);
    setSelectedServer(server);
    let channels = await server.channels.fetchList();
    setChannels(channels);
  }

  async function loadChannel(id: number) {
    let channel = await client.channels.fetch(id);
    setSelectedChannel(channel);
    let m = await channel.messages.query();
    setMessages(m);
    window.history.pushState(null, "", `/channels/${channel.guildId}/${channel.id}`);
  }

  async function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    let value = e.currentTarget.value;
    console.log(e.key);
    if (e.key === "Enter") {
      await selectedChannel?.messages.send(value);
    }
  }

  return (
    <FullPage>
      <Column style={{height: "100%"}}>
        <Row util={["no-shrink"]} className='sy-serverbar'>
            <Row util={["no-shrink", "align-center"]} className='sy-topbar'>
              <Icon src="/images/logos/no_shape_logo.png" size='50px' />
            </Row>
            <Row util={["align-center", "flex-grow"]} className='sy-serverlist'>
              {servers.map(s => <Icon 
                key={`pfp-${s.id}`}
                onClick={() => loadServer(s.id)} 
                size="48px" 
                src={s.avatar?.url ?? ""}
                fallback='/images/logos/no_shape_logo.png'
                />)}
            </Row>
            <Row util={["no-shrink", "align-center"]} className='sy-accountarea'>
              <Icon src={client?.user?.avatar.url ?? ""} size="48px" />
            </Row>
        </Row>
        <Row util={["no-shrink"]} className='sy-channelbar'>
          <Row util={["flex-grow"]}>
            <Row util={["no-shrink", "justify-center"]} className='sy-topbar sy-servername'>
              {selectedServer?.name}
            </Row>
            <Row util={["flex-grow"]} className='sy-channellist'>
              {channels.map(s => <Button type='inherit' style={{textAlign: "left"}} onClick={() => loadChannel(s.id)}>{s.name}</Button>)}
            </Row>
          </Row>
        </Row>
        <Row util={["flex-grow"]}>
          <Row util={["no-shrink", "justify-center"]} className='sy-topbar'>
            {selectedChannel?.name}
          </Row>
          <Row util={["flex-grow"]} className='sy-chatarea'>
            {(messages || []).map(x => <MessageC message={x}/>)}
          </Row>
          <Row util={["no-shrink"]} className='sy-messageinput'>
            <textarea onKeyUp={handleKeyDown}/>
          </Row>
        </Row>
      </Column>
    </FullPage>
  );
}

export default App;
