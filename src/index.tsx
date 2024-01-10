import ReactDOM from 'react-dom/client';
import App from './main-app/App';
import 'react-tooltip/dist/react-tooltip.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import "./images/background.png";

import './styles/defaults.css';
import "./styles/elements.css";
import "./styles/images.css";
import "./styles/messages.css";
import "./styles/modals.css";
import "./styles/single-modal-page.css";
import "./styles/image-expander.css";
import "./styles/context-menu.css";
import Login from './Routes/Login';
import ModalManager from './Components/ModalManager';
import FullscreenImageViewer from './Components/FullscreenImageViewer';
import ContextMenu from './Components/ContextMenus/ContextMenu';

const initialUrl = window.location.href;

const router = createBrowserRouter([
  // Stuff to do with the app
  {
    path: "/",
    element: <App></App>
  },
  {
    path: "/channels",
    element: <App></App>
  },
  {
    path: "/channels/:guildId?/:channelId?",
    element: <App></App>
  },

  // User management
  {
    "path": "/login",
    element: <Login></Login>
  },

  // Others
  {
    path: "/test",
    element: <label>Hello</label>
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <>
    <RouterProvider router={router}></RouterProvider>
    <ModalManager></ModalManager>
    <FullscreenImageViewer></FullscreenImageViewer>
    <ContextMenu></ContextMenu>
  </>
);

export {initialUrl};