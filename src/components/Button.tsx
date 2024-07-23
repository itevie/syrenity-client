import React from "react";
import { Children } from "../util";

interface ButtonProps {
    children: Children,
    jumbo?: boolean,
}

export default function Button(props: ButtonProps & React.HTMLAttributes<HTMLElement>) {
    const {jumbo, className, ...data} = props;

    return (
        <button {...data} className={`button ${jumbo ? "jumbo" : ""} ${className}`}>
            {props.children}
        </button>
    );
}