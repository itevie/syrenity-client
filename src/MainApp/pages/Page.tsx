import MaterialIcon from "../../components/MaterialIcon";
import { Children } from "../../util";
import { closePage } from "./PageManager";

export default function Page(props: { children: Children }) {
    return (
        <div className="page">
            {props.children}
            <MaterialIcon className="page-close-button" onClick={closePage} icon="close" />
        </div>
    );
}