import applyDefaultProps from "../util/applyDefaultProps";

interface ProfilePictureProps extends DefaultProps {
  avatar: string | null;
  onErrror?: (currentTarget: HTMLImageElement) => void;
}

export default function ProfilePicture(props: ProfilePictureProps) {
  const {avatar} = props;

  return applyDefaultProps(
    "img",
    props,
    {
      className: "profile-picture",
      src: avatar || "",
      alt: "fuck off",
      onError: (({ currentTarget }: {currentTarget: EventTarget & HTMLImageElement}) => {
        if (props?.onErrror) props.onErrror(currentTarget);
      })
    }
  );
}

export function generateDefaultPicture() {

}