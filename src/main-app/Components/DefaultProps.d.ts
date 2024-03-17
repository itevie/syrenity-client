interface DefaultProps {
  id?: string;
  tooltipContent?: string;
  tooltipFlyout?: PlacesType | undefined;
  className?: string;
  style?: {[key: string]: any};

  onClick?: (data: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onContextMenu?: (data: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}
