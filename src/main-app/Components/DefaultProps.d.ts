interface DefaultProps {
  id?: string;
  tooltipContent?: string;
  tooltipFlyout?: PlacesType | undefined;
  className?: string;

  onClick?: ({ currentTarget }: {currentTarget: EventTarget & HTMLElement}) => void;
  onContextMenu?: (data: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}