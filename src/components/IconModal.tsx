import { HTMLAttributes } from "react";
import { Children } from "../util";
import MaterialIcon from "./MaterialIcon";
import Modal from "./Modal";

interface IconModalProps {
    icon: string,
    children: Children,
}

export default function IconModal(props: IconModalProps & HTMLAttributes<HTMLButtonElement>) {
    let { children, ...rest } = props;

    return (
        <Modal>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <MaterialIcon {...rest} icon={props.icon} className="modal-header-icon" />
                <div>
                    {children}
                </div>
            </div>
        </Modal>
    )
}