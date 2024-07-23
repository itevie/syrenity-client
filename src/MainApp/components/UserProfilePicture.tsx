import User from "syrenity/build/structures/User";
import ProfilePicture from "../../components/ProfilePicture";
import { useAppSelector } from "../reduxStore";
import File from "syrenity/build/structures/File";
import { client } from "../App";
import { HTMLAttributes } from "react";

export default function UserProfilePicture(props: { user: User } & HTMLAttributes<HTMLImageElement>) {
    let { user, ...rest } = props;
    const users = useAppSelector(state => state.users);

    return (
        <ProfilePicture {...rest} avatar={File.resolveFile(client, users[user.id]?.avatar)} />
    )
}