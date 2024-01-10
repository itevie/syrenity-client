import applyDefaultProps from "../util/applyDefaultProps";

interface ImageIconOptions extends DefaultProps {
  icon: string;
}

export default function ImageIcon(props: ImageIconOptions) {
  return applyDefaultProps(
    "img",
    props,
    {
      src: props.icon
    }
  );
}