import { HTMLAttributes } from "react";

export default function ProfilePicture(props: { avatar: string } & HTMLAttributes<HTMLImageElement>) {
    return (
        <img 
            src={props.avatar} 
            alt="User Avatar" 
            {...props} 
            className={"base-image profile-picture " + (props.className || "")} />
    )
}