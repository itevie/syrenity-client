import applyDefaultProps from "../util/applyDefaultProps";
import MaterialIcon from "./MaterialIcon";

interface JumboControlOptions extends DefaultProps {
  children?: JSX.Element,
  icon: string,
  text: string,
}

export default function JumboControl(props: JumboControlOptions) {
  return applyDefaultProps(
    "div",
    {
      className: "page_big-option",
      onClick: props.onClick
    }, {},
    (
      <>
        <MaterialIcon icon={props.icon}></MaterialIcon>
        <label>{props.text}</label>
        <div className="page_big-option-right">
          {props.children || <></>}
        </div>
      </>
    )
  );
} 