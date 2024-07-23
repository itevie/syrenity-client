import { Child } from "../../util";
import Page from "./Page";

export default function TabbedPage(props: { children: [Child, Child] }) {
    return (
        <Page>
            <div className="tabbed-page-container">
                <div className="tabbed-page-tabs">
                    {props.children[0]}
                </div>
                <div className="tabbed-page-contents">
                    {props.children[1]}
                </div>
            </div>
        </Page>
    );
}