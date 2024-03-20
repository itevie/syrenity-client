import ImageIcon from "../Components/ImageIcon";
import Modal from "../Components/Modal";
import ModalHeader from "../Components/ModalHeader";
import { closeModal, showModal } from "../Components/ModalManager";
import SideBySide from "../Components/SideBySide";
import { arrayBufferToBase64 } from "../util/quick";
import ShowError from "./Error";

interface UploadImageData {
  message?: string,
  oldImage?: string,
  onUpload: (data: string) => void,
}

export default function UploadImage(data: UploadImageData) {
  let message = data.message || "Click the icon above to upload an image!";

  function uploadImage(element: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    // Create dummy input element
    const input = document.createElement("input");
    input.type = "file";

    // This is ran once a file is selected
    input.onchange = _ => {
      // Check for only 1 file
      if (input.files?.length !== 1) {
        return ShowError("Please provide exactly one image file.");
      }

      // Collect and validate file
      let givenFile = input.files[0];

      // Check if it is an image
      if (!givenFile.type.startsWith("image/")) {
        return ShowError("Please provide an image file. (.png, .jpeg etc.)");
      }

      // Read the file
      const reader = new FileReader();

      reader.onload = file => {
        let b64 = arrayBufferToBase64(file.target?.result as ArrayBuffer);
        data.onUpload(b64);
        (element.target as HTMLImageElement).src = `data:${givenFile.type};base64,${b64}`;
        closeModal(modalId);
      };

      reader.readAsArrayBuffer(givenFile);
    }

    // Show open file dialog
    input.click();
  }

  const modalId = showModal(
    <Modal>
      <ImageIcon onClick={uploadImage} icon={data.oldImage || "/images/icons/upload_image.png"} className="modal-icon clickable"></ImageIcon>
      <ModalHeader>Upload</ModalHeader>
      <p>{message}</p>
      <SideBySide>
        <button className="jumbo" id="modal-error-close-button" onClick={() => closeModal(modalId)}>Cancel</button>
        <button className="jumbo" id="modal-error-close-button" onClick={() => closeModal(modalId)}>Upload</button>
      </SideBySide>
    </Modal>
  );
}