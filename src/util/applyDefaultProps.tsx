import React from "react";
import { Tooltip } from "react-tooltip";

/**
 * This applies all of the default props from within DefaultProps.d.ts options
 * it applies tooltips and such
 * @param type The base element to create
 * @param props The props For the element
 * @param innerElement The optional inner child for the element
 * @returns The fully computed element
 */
export default function applyDefaultProps(
  type: keyof JSX.IntrinsicElements, 
  defaultProps: DefaultProps,
  elementProps: {[key: string]: any} | null = null,
  innerElement: JSX.Element | null = null
): JSX.Element {
  // Combine the props
  let props: {[key: string]: any} = {
    ...(elementProps || {}), 
    ...{
      id: defaultProps.id, 
      className: defaultProps.className,
    }
  };

  if (defaultProps.onClick) props.onClick = defaultProps.onClick;
  if (defaultProps.onContextMenu) props.onContextMenu = defaultProps.onContextMenu;

  // Check if should combine className
  if (elementProps?.className) {
    props.className = `${elementProps?.className} ${defaultProps.className || ""}`;
  }

  // Create the element
  let element = 
  <>
    {React.createElement(type, props, innerElement)}
  </>;

  // Check for tooltip
  if (defaultProps.tooltipContent) {
    element = (
      <>
        {element}
        <Tooltip place={defaultProps.tooltipFlyout || "top"} anchorSelect={"#" + props.id} content={defaultProps.tooltipContent} />
      </>
    );
  }

  return element;
}