/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";

interface ModalOptions {
  children: JSX.Element | JSX.Element[];
  parentType?: string;
  props?: {[key: string]: any};
  big?: boolean;
  intrusive?: boolean;
  autoFocus?: string;
}

export default function Modal(props: ModalOptions) {
  useEffect(() => {
    if (props.autoFocus)
      document.getElementById(props.autoFocus)?.focus();
  }, []);

  return (
    <div>
      {props.intrusive === undefined || props.intrusive ? <div className="intrusive-modal" /> : <></>}
      {React.createElement(props.parentType || "div", { className: `modal-container` }, (
        <>
          <div className={`modal ${props.big ? "big-modal" : ""}`}>
            {props.children}
          </div>
        </>
      ))}
    </div>
  );
}