export default function ModalHeader(props: {children: JSX.Element | string}) {
  return (
    <label className="modal-title">
      {props.children}
    </label>
  );
}