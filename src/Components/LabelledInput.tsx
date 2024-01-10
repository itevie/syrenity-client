export default function LabelledInput(props: { content: string, children: JSX.Element }) {
  return (
    <>
      <label className="input-name">{props.content}</label>
      {props.children}
    </>
  );
}