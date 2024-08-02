import css from "./Dialog.module.css";

interface DialogProps {
  openModal: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

export const Dialog = ({ openModal, closeModal, children }: DialogProps) => {

  return openModal ? (
    <div>
      <div className={css.dialog}>
        <h2>Dialog</h2>
        {children}
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  ) : null;
};
