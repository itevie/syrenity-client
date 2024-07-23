import File from "syrenity/build/structures/File";
import Button from "../components/Button";
import IconModal from "../components/IconModal";
import Modal from "../components/Modal";
import ModalContent from "../components/ModalContent";
import { addModal, closeModal } from "../components/ModalManager"
import SideBySide from "../components/SideBySide";
import { client } from "../MainApp/App";
import { showErrorModal } from "../util/modalPresets";

export default function showUploadFileModal(): Promise<File | null> {
    return new Promise<File | null>((resolve, reject) => {
        function selectFile() {
            // Create dummy input element
            const input = document.createElement("input");
            input.type = "file";

            // This is ran once a file is selected
            input.onchange = _ => {
                // Check for only 1 file
                if (input.files?.length !== 1) {
                    return showErrorModal("Please provide exactly one image file.");
                }

                // Collect and validate file
                let givenFile = input.files[0];

                // Check if it is an image
                if (!givenFile.type.startsWith("image/")) {
                    return showErrorModal("Please provide an image file. (.png, .jpeg etc.)");
                }

                // Read the file
                const reader = new FileReader();

                reader.onload = async file => {
                    let b64 = arrayBufferToBase64(file.target?.result as ArrayBuffer);

                    // Upload file
                    let f = await client.files.create({
                        name: givenFile.name,
                        data: b64
                    });

                    closeModal();
                    resolve(f);
                };

                reader.readAsArrayBuffer(givenFile);
            }

            // Show open file dialog
            input.click();
        }

        addModal(
            <IconModal icon="upload" onClick={selectFile}>
                <ModalContent>
                    Click the icon above to upload the file
                </ModalContent>
                <SideBySide>
                    <Button jumbo={true} onClick={() => { closeModal(); resolve(null); }}>Cancel</Button>
                    <Button jumbo={true}>Upload</Button>
                </SideBySide>
            </IconModal>
        );
    });
}



export function arrayBufferToBase64(buffer: ArrayBuffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}