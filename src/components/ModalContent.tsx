import { Children } from "../util";

export default function ModalContent(props: { children: Children }) {
    return (
        <div className="modal-content">
            {props.children}
        </div>
    )
}