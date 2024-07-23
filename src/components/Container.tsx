import { HTMLAttributes } from "react";
import { Children } from "../util";

export default function Container(props: { children: Children } & HTMLAttributes<HTMLElement>) {
    return (
        <div className="container" {...props}>
            {props.children}
        </div>
    );
}