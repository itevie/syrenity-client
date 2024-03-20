import Page from "../../Components/Page";
import PageContent from "../../Components/PageContent";
import PageSidebar from "../../Components/PageSidebar";
import PageSection from "../../Components/PageSection";
import { useState } from "react";
import { useAppSelector } from "../reduxStore";
import PageContainer from "../../Components/PageContainer";
import PageClose from "../../Components/PageClose";

export default function GuildSettings() {
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
          <b>Settings</b>
          <button onClick={()=>updateSelected("general")}>General</button>
        </PageSidebar>
        <PageContent>
          <PageSection selected={selectedSection === "ongeneralline"}>
            <h1>General Settings</h1>
          </PageSection>
        </PageContent>
      </Page>
      <PageClose></PageClose>
    </PageContainer>
  );
}
