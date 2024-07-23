import { Children } from "../util";

interface ModalDetails {
    children: Children,
    big?: boolean,
}

export default function Modal(props: ModalDetails) {
    return (
        <div className={`modal ${props.big ? "big-modal" : ""}`}>
            {props.children}
        </div>
    )
}