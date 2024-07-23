import { HTMLAttributes } from "react";

/**
 * The icon prop simply points to an svg in /public/icons/xxx.svg
 * @param props 
 * @returns Stuff
 */
export default function MaterialIcon(props: { icon: string } & HTMLAttributes<HTMLSpanElement>) {
    return (
        <img
            {...props}
            alt={props["aria-label"] || props.icon}
            className={(props.className ? props.className : "")}
            src={`/icons/${props.icon}.svg`} />
    );
}