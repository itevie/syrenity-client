import Logger from "../Logger";
import { loadMessage } from "./Components/ChannelContent";
import * as Syrenity from "./Syrenity/index";

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const logger = new Logger("client");

const client = new Syrenity.Client({
  ignoreIsBrowser: isDev,
  baseURL: isDev ? "localhost:3000" : new URL(window.location.href).host,
  apiURL: (isDev ? "localhost:3000" : new URL(window.location.href).host) + "/api",
  useSecure: new URL(window.location.href).protocol.includes("s"),
});

client.on("debug", message => {
  logger.log(message);
});

client.on("messageCreate", message => {
  loadMessage(message);
});

let alreadyTried = false

export function startClient() {
  if (alreadyTried) return;
  alreadyTried = true;
  client.login(isDev ? (localStorage.getItem("testing-token") || "") : "");
}

export default client;