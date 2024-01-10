import { useRef } from "react";
import ImageIcon from "../Components/ImageIcon";
import LabelledInput from "../Components/LabelledInput";
import Modal from "../Components/Modal";
import ModalHeader from "../Components/ModalHeader";
import axios from "axios";
import ShowError from "../Modals/Error";
import SingleModalLayout from "../Components/SingleModalLayout";
import { disable, enable, getUrl } from "../util/quick";

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const submitButton = useRef<HTMLInputElement>(null);

  function login(data: React.MouseEvent<HTMLInputElement>) {
    data.preventDefault();
    disable(submitButton.current);

    const email = emailRef.current?.value as string;
    const password = passwordRef.current?.value as string;
    console.log(getUrl());
    axios.post(getUrl() + "/auth/password", {
      username: email,
      password,
    }).then(res => {
      console.log("Logged in!");

      setTimeout(() => {
        window.location.href = "/";  
      }, 1000);
    }).catch(err => {
      enable(submitButton.current);
      ShowError(err.message);
    });
  }

  return (
    <SingleModalLayout>
      <Modal parentType="form" big={true} intrusive={false}>
        <ImageIcon icon="/images/logos/no_shape_logo.png" className="modal-icon"></ImageIcon>
        <ModalHeader>Welcome back to Syrenity!</ModalHeader>
        <p>Let's get you logged in!</p>
        <LabelledInput content="Email:">
          <input autoComplete="email" ref={emailRef} className="jumbo" type="email"></input>
        </LabelledInput>
        <LabelledInput content="Password:">
          <input autoComplete="password" ref={passwordRef} className="jumbo" type="password"></input>
        </LabelledInput>
        <input ref={submitButton} className="jumbo" type="submit" value="Login" onClick={(data) => login(data)}></input>
      </Modal>
    </SingleModalLayout>
  );
}