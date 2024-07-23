import { HTMLAttributes, useState } from "react";
import { Children } from "../util";

import "../styles/tooltip.css";

export interface ToolTipProps {
    content: string,
    flyout: "right";
    children: Children,
} 

export default function ToolTip(props: ToolTipProps & HTMLAttributes<HTMLElement>) {
    const [shown, setShown] = useState<boolean>(false);
    const [position, setPosition] = useState<[number, number]>([0, 0]);

    function mouseOver(target: React.SyntheticEvent<HTMLDivElement>) {
        const div = (target.target as HTMLDivElement).parentElement;

        if (!div?.getAttribute("data-tooltip-container")) return;

        const rect = div.getBoundingClientRect();
        let top = rect.top;
        let left = rect.left;

        // Check if it should be moved
        if (props.flyout === "right")
            left += rect.width;

        setPosition([top, left]);
        setShown(true);
    }

    function mouseLeave(target: React.SyntheticEvent<HTMLDivElement>) {        
        setShown(false);
    }

    return (
        <>
            <div className="tooltip" style={{ 
                top: `${position[0]}px`,
                left: `${position[1]}px`,
                display: shown ? "block" : "none"}}>
                <label>{props.content}</label>
            </div>
            <div data-tooltip-container onMouseOver={mouseOver} onMouseLeave={mouseLeave}>
                {props.children}
            </div>
        </>
    )
}