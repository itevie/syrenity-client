export default function PageSection(props: { children: JSX.Element[] | JSX.Element, selected: boolean }) {
  return (
    <>
      {props.selected ? props.children : <></>}
    </>
  );
}