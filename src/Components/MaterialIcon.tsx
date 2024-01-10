import applyDefaultProps from "../util/applyDefaultProps";

interface MatialIconProps extends DefaultProps {
  icon: string;
}

export default function MaterialIcon(props: MatialIconProps) {
  return applyDefaultProps(
    "span",
    props,
    {
      className: "material-symbols-outlined",
    },
    <>
      {props.icon}
    </>
  );
}