import client from "../Client";
import ImageIcon from "../../Components/ImageIcon";
import MaterialIcon from "../../Components/MaterialIcon";
import { showPage } from "./PageManager";

export default function GuildBarUserSection() {
  return (
    <div className="guild-bar-control-panel">
      <ImageIcon icon={client.currentUser?.avatar || "/images/icons/no_pfp.png"} className={"base-image guild-bar-icon"}></ImageIcon>
      <MaterialIcon icon="notifications" className="guild-bar-control-button"></MaterialIcon>
      <MaterialIcon icon="settings" className="guild-bar-control-button" onClick={()=>{showPage("app_settings")}}></MaterialIcon>
    </div>
  );
}