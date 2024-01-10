import { closeModal, showModal } from "../Components/ModalManager";
import Modal from "../Components/Modal";
import ImageIcon from "../Components/ImageIcon";
import ModalHeader from "../Components/ModalHeader";

export default function ShowError(error: string | Error) {
  const contents = error.toString();

  const modalId = showModal(
    <Modal autoFocus="modal-error-close-button">
      <ImageIcon icon="/images/icons/error.png" className="modal-icon"></ImageIcon>
      <ModalHeader>Error</ModalHeader>
      <p>{contents}</p>
      <button id="modal-error-close-button" onClick={() => closeModal(modalId)}>Close</button>
    </Modal>
  );
}