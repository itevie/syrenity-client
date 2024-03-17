import { closePage } from "../main-app/Components/PageManager";
import MaterialIcon from "./MaterialIcon";

export default function PageClose() {
  return (
    <div className="page-close" onClick={closePage}>
      <MaterialIcon icon="close"></MaterialIcon>
    </div>
  );
}