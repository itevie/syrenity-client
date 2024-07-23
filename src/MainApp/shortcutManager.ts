import showUploadFileModal from "../modals/uploadFile";
import { showErrorModal } from "../util/modalPresets";
import showSettingsPage from "./pages/pages/settings";

interface Shortcut {
    description: string,
    shortcut: string,
    shortcutAlts?: string[],
    action: () => any,
}

export const shortcuts: { [key: string]: Shortcut } = {
    "open-settings-page": {
        description: "Opens the settings page",
        shortcut: "CTRL+SHIFT;KeyS",
        action: showSettingsPage,
    },
    "example-modal": {
        description: "Show an example modal",
        shortcut: "CTRL+SHIFT;Digit1",
        action: () => showErrorModal("Error!"),
    },
    "upload-file": {
        description: "Upload a file",
        shortcut: "CTRL+SHIFT+ALT;KeyU",
        action: () => showUploadFileModal(),
    }
};

// Detect shortcuts
document.addEventListener("keydown", e => {
    // Check if there was at least 1 modifier
    if (e.altKey || e.shiftKey || e.ctrlKey || e.metaKey) {
        // Loop through them
        for (const i in shortcuts) {
            if (isMatch(shortcuts[i].shortcut, e))
                shortcuts[i].action();
        }
    }
});

function isMatch(shortcut: string, e: KeyboardEvent): boolean {
    let parts = shortcut.split(";");
    let modifiers = parts[0].split("+");
    let key = parts[1];

    if (key !== e.code) return false;
    if (modifiers.includes("CTRL") && !e.ctrlKey) return false;
    if (modifiers.includes("ALT") && !e.altKey) return false;
    if (modifiers.includes("SHIFT") && !e.shiftKey) return false;
    if (modifiers.includes("META") && !e.metaKey) return false;

    return true;
}