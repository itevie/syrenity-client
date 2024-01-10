import { Provider } from "react-redux";
import MainPart from "./Components/MainPart";
import ServerBar from "./Components/ServerBar";
import reduxStore from "./reduxStore";

export default function Main() {
  return (
    <Provider store={reduxStore}>
      <div className="container">
        <ServerBar></ServerBar>
        <MainPart></MainPart>
      </div>
    </Provider>
  );
}