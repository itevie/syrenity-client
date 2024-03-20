import React from "react";

interface ImageIconOptions extends React.ImgHTMLAttributes<HTMLImageElement> {
  icon: string;
}

export default function ImageIcon(props: ImageIconOptions) {
  let {icon, ...data} = {...props, icon: props.icon,};

  return (
    <img {...data} src={icon} alt="kys"></img>
  )
}