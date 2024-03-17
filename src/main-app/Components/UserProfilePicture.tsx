import applyDefaultProps from "../../util/applyDefaultProps";
import setNoAvatarIcon from "../../util/noAvatarIcon";
import { showForUser } from "./UserProfileViewer";
import { useAppSelector } from "../reduxStore";

interface ProfilePictureProps extends DefaultProps {
  avatar: string | null;
  userId: number;
}

export default function UserProfilePicture(props: ProfilePictureProps) {
  const {avatar} = props;
  const users = useAppSelector(state => state.users);

  return applyDefaultProps(
    "img",
    props,
    {
      className: "profile-picture no-select",
      src: users[props.userId]?.avatar || "",
      alt: props.userId.toString(),
      onError: (({ currentTarget }: {currentTarget: EventTarget & HTMLImageElement}) => {
        // Only do this if the avatar was null, so it doesn't wrongfully overwrite it.
        if (users[props.userId] && !users[props.userId].avatar) setNoAvatarIcon(props.userId, currentTarget);
      }),
      onClick: (({currentTarget}: {currentTarget: EventTarget & HTMLImageElement}) => {
        showForUser(props.userId, currentTarget);
      }),
    }
  );
}
