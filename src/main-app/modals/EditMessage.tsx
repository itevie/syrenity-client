import Modal from "../../Components/Modal";
import SideBySide from "../../Components/SideBySide";
import { Message as SyrenityMessage} from "syrenity-api-client";
import Message from "../Components/Message";
import { useEffect, useRef, useState } from "react";

interface ConfirmOptions {
  onFinish: (newContent: string) => void;
  message: SyrenityMessage;
}

export let setEditMessage: (data: ConfirmOptions) => void = () => {};

export default function EditMessageModal() {
  const [show, setShow] = useState<"none" | "block">("none");
  const [message, setMessage] = useState<SyrenityMessage>();
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let cdata: ConfirmOptions | null = null;
    setEditMessage = (data) => {
      (data.message as any).key = Math.random().toString();
      setMessage(data.message);
      setShow("block");
      cdata = data;

      if (inputRef.current) {
        inputRef.current.value = data.message.content;
        setTimeout(() => {
          inputRef.current?.focus();
        }, 10);
      }
    }

    buttonRef.current?.addEventListener("click", () => {
      cdata?.onFinish(inputRef.current?.value || "");
      setShow("none");
    })

    if (inputRef.current) {
      inputRef.current.onkeydown = (e) => {
        if (e.key === "Enter") {
          cdata?.onFinish(inputRef.current?.value || "");
          setShow("none");
        }
      }
    }
  }, []);

  return (
    <div style={{display: show}}>
      <Modal autoFocus="modal-error-close-button">
        <div style={{textAlign: "left"}}>
          {message ? <Message key={(message as any).key} message={message} isGrouped={false} /> : <></>}
        </div>
        <br />
        <input className="jumbo" ref={inputRef} />
        <SideBySide>
          <button className="jumbo" id="modal-edit-cancel-button" onClick={() => {setShow("none")}}>Cancel</button>
          <button ref={buttonRef} className="jumbo" id="modal-edit-confirm-button" onClick={() => {setShow("none");}}>Confirm</button>
        </SideBySide>
      </Modal>
    </div>
  );
}