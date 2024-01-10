import { closeModal, showModal } from "../Components/ModalManager";
import Modal from "../Components/Modal";
import ImageIcon from "../Components/ImageIcon";
import ModalHeader from "../Components/ModalHeader";
import SideBySide from "../Components/SideBySide";

interface ConfirmOptions {
  confirm: () => void;
  cancel?: () => void;
  question: string;
}

export default function ShowConfirm(data: ConfirmOptions) {
  const modalId = showModal(
    <Modal autoFocus="modal-error-close-button">
      <ImageIcon icon="/images/icons/confirm.png" className="modal-icon"></ImageIcon>
      <ModalHeader>Confirm</ModalHeader>
      <p>{data.question}</p>
      <SideBySide>
        <button className="jumbo" id="modal-confirm-cancel-button" onClick={() => {if (data.cancel)data.cancel(); closeModal(modalId);}}>Cancel</button>
        <button className="jumbo" id="modal-confirm-confirm-button" onClick={() => {data.confirm(); closeModal(modalId);}}>Confirm</button>
      </SideBySide>
    </Modal>
  );
}