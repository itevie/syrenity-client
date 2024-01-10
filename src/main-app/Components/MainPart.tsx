import ChannelBarContainer from "./ChannelBarContainer";
import MainContent from "./MainContent";

export default function MainPart() {
  return (
    <div className="main-part">
      <ChannelBarContainer></ChannelBarContainer>
      <MainContent></MainContent>
    </div>
  );
}