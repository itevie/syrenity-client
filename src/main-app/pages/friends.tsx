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
import axios from "axios";
import ShowError from "../../Modals/Error";

export default function Friends() {
  const [selectedSection, setSelectedSection] = useState<string | null>("online");
  const settings = useAppSelector(state => state.settings);
  const users = useAppSelector(state => state.users);

  function updateSelected(selected: string) {
    setSelectedSection(selected);
  }

  return(
    <PageContainer>
      <Page>
        <PageSidebar>
          <b>Your Friends</b>
          <button onClick={()=>updateSelected("online")}>Online</button>
          <button onClick={()=>updateSelected("all")}>All</button>
          <b>Requests</b>
          <button onClick={()=>updateSelected("requests")}>Requests</button>
          <button onClick={()=>updateSelected("requests")}>Send Request</button>
          <b>Blocked</b>
          <button onClick={()=>updateSelected("blocked")}>Blocked</button>
        </PageSidebar>
        <PageContent>
          <PageSection selected={selectedSection === "online"}>
            <h1>Online Friends</h1>
          </PageSection>
        </PageContent>
      </Page>
      <PageClose></PageClose>
    </PageContainer>
  );
}
