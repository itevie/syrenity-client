import { useEffect, useState } from "react";

import "../styles/modals.css";

const modals: JSX.Element[] = [];
export let addModal: (data: any) => void = () => {};
export let closeModal: () => void = () => {};

export default function ModalManager() {
    const [currentModal, setCurrentModal] = useState<JSX.Element | null>(null);

    function updateModal() {
        setCurrentModal(modals[modals.length - 1]);
    }

    useEffect(() => {
        addModal = data => {
            modals.push(data);
            updateModal();
        }

        closeModal = () => {
            modals.pop();
            updateModal();
        }
    }, []);

    return (
        <div className="modal-container" style={{display: currentModal ? "block" : "none"}}>
            {currentModal}
        </div> 
    )
}