import MainPart from "./Components/MainPart";
import ServerBar from "./Components/ServerBar";

export default function Main() {
  return (
    <div className="container">
      <ServerBar></ServerBar>
      <MainPart></MainPart>
    </div>
  );
}