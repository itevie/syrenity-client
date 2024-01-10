import applyDefaultProps from "../../util/applyDefaultProps";
import setNoAvatarIcon from "../../util/noAvatarIcon";
import { showForUser } from "./UserProfileViewer";

interface ProfilePictureProps extends DefaultProps {
  avatar: string | null;
  userId: number;
}

export default function UserProfilePicture(props: ProfilePictureProps) {
  const {avatar} = props;

  return applyDefaultProps(
    "img",
    props,
    {
      className: "profile-picture no-select",
      src: avatar || "",
      alt: "fuck off",
      onError: (({ currentTarget }: {currentTarget: EventTarget & HTMLImageElement}) => {
        setNoAvatarIcon(props.userId, currentTarget);
      }),
      onClick: (({currentTarget}: {currentTarget: EventTarget & HTMLImageElement}) => {
        showForUser(props.userId, currentTarget);
      })
    }
  );
}