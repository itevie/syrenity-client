import Logger from "../Logger";
import { loadMessage } from "./Components/ChannelContent";
import * as Syrenity from "syrenity-api-client";

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

export async function startClient() {
  if (alreadyTried) return;
  alreadyTried = true;
  try {
    client.login(await getToken());
  } catch (err) {
    console.log(err);
  }
}

export async function startClientWithoutWebsockets() {
  if (alreadyTried) return;
  alreadyTried = true;
  client.loginWithoutWebsockets(await getToken());
}

export async function getToken() {
  let testingToken = localStorage.getItem("testing-token");

  if (isDev && testingToken) {
    return testingToken;
  }

  // Check if logged in
  let isLoggedIn = await client.isLoggedIn();

  // Check what to do
  if (isLoggedIn === false) {
    // Redirect to /login
    window.location.href = "/login";
  }

  return "";
}

export default client;
