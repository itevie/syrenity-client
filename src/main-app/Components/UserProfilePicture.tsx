/* eslint-disable jsx-a11y/alt-text */
import setNoAvatarIcon from "../../util/noAvatarIcon";
import { showForUser } from "./UserProfileViewer";
import { useAppSelector } from "../reduxStore";

interface ProfilePictureProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  avatar: string | null;
  userId: number;
  onClickOverride?: ({currentTarget}: {currentTarget: EventTarget & HTMLImageElement}) => void,
}

export default function UserProfilePicture(props: ProfilePictureProps) {
  const {avatar, userId, onClickOverride, ...data} = props;
  const users = useAppSelector(state => state.users);

  return (
    <img
      src={users[userId]?.avatar}
      className="profile-picture no-select clickable"
      onError={(({ currentTarget }: {currentTarget: EventTarget & HTMLImageElement}) => {
        // Only do this if the avatar was null, so it doesn't wrongfully overwrite it.
        if (!users[userId] || !users[userId].avatar) setNoAvatarIcon(userId, currentTarget);
      })}
      onClick={onClickOverride || (({currentTarget}: {currentTarget: EventTarget & HTMLImageElement}) => {
        showForUser(userId, currentTarget);
      })}
      {...data}
      />
  );
}
