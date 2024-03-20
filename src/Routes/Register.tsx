import { useRef } from "react";
import ImageIcon from "../Components/ImageIcon";
import LabelledInput from "../Components/LabelledInput";
import Modal from "../Components/Modal";
import ModalHeader from "../Components/ModalHeader";
import axios from "axios";
import ShowError from "../Modals/Error";
import SingleModalLayout from "../Components/SingleModalLayout";
import { disable, enable, getUrl } from "../util/quick";

export default function Register() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);
  const submitButton = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);

  function register(data: React.MouseEvent<HTMLInputElement>) {
    data.preventDefault();
    disable(submitButton.current);

    const email = emailRef.current?.value as string;
    const password = passwordRef.current?.value as string;
    const username = usernameRef.current?.value as string;
    console.log(getUrl() + "/api/register");
    axios.post(getUrl() + "/api/register", {
      email,
      password,
      username,
    }).then(res => {
      setTimeout(() => {
        window.location.href = "/login";  
      }, 1000);
    }).catch(err => {
      console.log(err.message);
      enable(submitButton.current);
      ShowError(err.message);
    });
  }

  return (
    <SingleModalLayout>
      <Modal parentType="form" big={true} intrusive={false}>
        <ImageIcon icon="/images/logos/no_shape_logo.png" className="modal-icon"></ImageIcon>
        <ModalHeader>Welcome to Syrenity!</ModalHeader>
        <p>Ready to create your new Syrenity account?</p>
        <LabelledInput content="Email:">
          <input autoComplete="email" ref={emailRef} className="jumbo" type="email"></input>
        </LabelledInput>
        <LabelledInput content="Username:">
          <input ref={usernameRef} className="jumbo" type="text"></input>
        </LabelledInput>
        <LabelledInput content="Password:">
          <input autoComplete="password" ref={passwordRef} className="jumbo" type="password"></input>
        </LabelledInput>
        <LabelledInput content="Confirm Password:">
          <input autoComplete="password" ref={confirmRef} className="jumbo" type="password"></input>
        </LabelledInput>
        <input ref={submitButton} className="jumbo" type="submit" value="Login" onClick={(data) => register(data)}></input>
      </Modal>
    </SingleModalLayout>
  );
}