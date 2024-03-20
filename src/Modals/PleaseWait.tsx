import { closeModal, showModal } from "../Components/ModalManager";
import Modal from "../Components/Modal";
import ImageIcon from "../Components/ImageIcon";
import ModalHeader from "../Components/ModalHeader";

export default function PleaseWait() {
  const modalId = showModal(
    <Modal autoFocus="modal-error-close-button">
      <ImageIcon icon="/images/icons/clock.png" className="modal-icon"></ImageIcon>
      <ModalHeader>Please Wait</ModalHeader>
    </Modal>
  );

  return {
    close: () => closeModal(modalId),
  } as const;
}