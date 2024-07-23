import { HTMLAttributes } from "react";

export default function UserIcon(props: { avatar: string } & HTMLAttributes<HTMLImageElement>) {
    return (
        <img 
            src={props.avatar} 
            alt="User Avatar" 
            {...props} 
            className={"base-image " + (props.className || "")} />
    )
}