import Page from "../../Components/Page";
import PageContent from "../../Components/PageContent";
import PageSidebar from "../../Components/PageSidebar";
import PageSection from "../../Components/PageSection";
import SideBySide from "../../Components/SideBySide";
import UserProfilePicture from "../Components/UserProfilePicture";
import VerticalCenter from "../../Components/VerticalCenter";
import JumboControl from "../../Components/JumboControl";
import { useState } from "react";
import { useAppSelector } from "../reduxStore";
import PageContainer from "../../Components/PageContainer";
import client from "../Client";
import PageClose from "../../Components/PageClose";
import { useDispatch } from "react-redux";
import { setKey } from "../stores/settings";
import { DangerLinedText } from "../../Components/LinedText";
import UploadImage from "../../Modals/UploadImage";
import { addUser } from "../stores/users";
import PleaseWait from "../../Modals/PleaseWait";

export default function UserSettings() {
  const [selectedSection, setSelectedSection] = useState<string | null>("my_account");
  const dispatch = useDispatch();
  const settings = useAppSelector(state => state.settings);
  const users = useAppSelector(state => state.users);

  function updateSelected(selected: string) {
    setSelectedSection(selected);
  }

  function changeAccentColor(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const input = document.createElement("input");
    input.type = "color";
    input.value = settings.accent;
    input.style.position = "absolute";
    input.style.top = `${rect.y}px`;
    input.style.left = `${rect.x}px`;
    input.click();

    input.addEventListener("change", () => {
      // Set the new value
      localStorage.setItem("accent-color", input.value);
      dispatch(setKey(["accent", input.value]));
    });
  }

  async function changeProfilePicture() {
    UploadImage({
      message: "Click the icon above to change your profile picture!",
      oldImage: (await client.user(client.currentUser.id).fetch()).avatar || "",
      onUpload: data => {
        let waiter = PleaseWait();
        client.currentUser.updateAvatar(data).then(async (d) => {
          // Refresh current user
          console.log(d);
          dispatch(addUser(d.extractData()));
          waiter.close();
        });
      }
    });
  }

  return(
    <PageContainer>
      <Page>
        <PageSidebar>
          <b>User Settings</b>
          <button onClick={()=>updateSelected("my_account")}>My Account</button>
          <b>App Settings</b>
          <button onClick={()=>updateSelected("appearance")}>Appearance</button>
          <button onClick={()=>updateSelected("advanced")}>Advanced</button>
        </PageSidebar>
        <PageContent>
          {/* MY ACCOUNT */}
          <PageSection selected={selectedSection === "my_account"}>
            <h1>My Account</h1>
            <SideBySide type="left">
              <UserProfilePicture onClickOverride={changeProfilePicture} userId={client.currentUser.id} avatar={users[client.currentUser.id].avatar || ""}></UserProfilePicture>
              <VerticalCenter>
                <label>{users[client.currentUser.id].username}</label>
              </VerticalCenter>
            </SideBySide>
            <JumboControl icon="person" text="Change Username" />
            <JumboControl icon="key" text="Change Password" />
            <DangerLinedText>Danger Zone</DangerLinedText>
            <SideBySide>
              <JumboControl icon="close" text="Disable your account" />
              <JumboControl icon="delete" text="Delete your account" />
            </SideBySide>
            {/*<SideBySide>
              <JumboControl icon="login" text="Get Account Token" onClick={getAccountToken} />
              <JumboControl icon="delete" text="Delete Account Token" />
            </SideBySide>*/}
          </PageSection>

          {/* APPEARANCE */}
          <PageSection selected={selectedSection === "appearance"}>
            <h1>App Settings</h1>
            <JumboControl icon="palette" text="Change accent color" onClick={changeAccentColor}>
              <div className="circle" style={{backgroundColor: settings.accent}}></div>
            </JumboControl>
          </PageSection>

          {/* ADVANCED SETTINGS */}
          <PageSection selected={selectedSection === "advanced"}>
            <h1>Advanced Settings</h1>
            <JumboControl icon="sync_alt" text="Use Syrenity Proxy">
              <input type="checkbox" />
            </JumboControl>
          </PageSection>
        </PageContent>
      </Page>
      <PageClose></PageClose>
    </PageContainer>
  );
}
