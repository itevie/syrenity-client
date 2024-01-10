import { useEffect, useState } from "react";

let addModal: (modal: JSX.Element) => number;
let closeRModal: (id: number) => void;
let count = 0;

interface ModalData {
  id: number;
  element: JSX.Element;
  openedAt: number;
}

export default function ModalManager() {
  const [modals, updateModals] = useState<ModalData[]>([]);

  useEffect(() => {
    addModal = modal => {
      let id = count++;
      updateModals(old => [...old, { id, element: modal, openedAt: Date.now()}]);

      return id;
    }

    closeRModal = id => {
      let modal = modals.find(x => x.id === id);
      if (300 - (Date.now() - (modal?.openedAt || 0)) > 0 ) return;

      updateModals(old => old.filter(x => x.id !== id));
    }
  });

  return (
    <div id="modal-manager">
      {modals.map(modal => <div key={`modal-${modal.id}`}>{modal.element}</div>)}
    </div>
  );
}

export function showModal(modalElement: JSX.Element): number {
  return addModal(modalElement);
}

export function closeModal(id: number) {
  closeRModal(id);
}