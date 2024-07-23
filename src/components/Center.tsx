import { Children } from "../util";

export default function Center(props: { children: Children }) {
    return (
        <div className="page-center">
            {props.children}
        </div>
    )
} 