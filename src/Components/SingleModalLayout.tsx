export default function SingleModalLayout(props: {children: JSX.Element | JSX.Element[]}) {
  return (
    <div className="apply-background">
      {props.children}
    </div>
  );
}