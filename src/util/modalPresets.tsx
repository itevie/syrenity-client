import Button from "../components/Button";
import IconModal from "../components/IconModal";
import ModalContent from "../components/ModalContent";
import { addModal, closeModal } from "../components/ModalManager";
import SideBySide from "../components/SideBySide";

export function showErrorModal(message: string): void {
    addModal(
        <IconModal icon="error">
            <ModalContent>{message}</ModalContent>
            <SideBySide>
                <Button jumbo={true} onClick={closeModal}>Close</Button>
            </SideBySide>
        </IconModal>
    );
}

export function showConfirmModal(
    message: string,
    options: {
        yesCallback: () => void,
        noCallback?: () => void,
        yesMessage?: string,
        noMessage?: string,
    }
): void {
    addModal(
        <IconModal icon="help">
            <ModalContent>{message}</ModalContent>
            <SideBySide>
                <Button jumbo={true} onClick={() => { closeModal(); if (options.noCallback) options.noCallback(); }}>{options.noMessage ?? "No"}</Button>
                <Button jumbo={true} onClick={() => { closeModal(); if (options.yesCallback) options.yesCallback(); }}>{options.yesMessage ?? "Yes"}</Button>
            </SideBySide>
        </IconModal>
    );
}