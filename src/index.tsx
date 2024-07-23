import ReactDOM from 'react-dom/client';
import App from './MainApp/App';

import "./styles/base.css";
import "./styles/context-menus.css";
import "./styles/elements.css";
import "./styles/message.css";
import "./styles/modals.css";
import "./styles/pages.css";
import "./styles/routes.css";
import "./styles/tooltip.css";

import ModalManager from './components/ModalManager';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './routes/Login';
import ContextMenuManager from './components/ContextMenuManager';
import Home from './routes/Home';
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    // ----- Main App Shit -----
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/channels",
        element: <App />
    },
    {
        path: "/channels/:channelId?/:guildId?",
        element: <App />
    },

    // ----- Other Site -----

    // ----- User Management -----
    {
        path: "/login",
        element: <Login />
    }
]);

root.render(
    <>
        <RouterProvider router={router} />
        <ModalManager />
        <ContextMenuManager />
    </>
);