import MaterialIcon from "../../components/MaterialIcon";
import showSettingsPage from "../pages/pages/settings";

export default function ServerBarUserSection() {
    return (
        <div className="server-bar-user-section">
            <MaterialIcon onClick={showSettingsPage} icon="settings" className="user-section-button" />
        </div>
    )
}