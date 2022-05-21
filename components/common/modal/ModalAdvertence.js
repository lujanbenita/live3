import ReactHtmlParser from "react-html-parser";
import { Modal } from "./Modal";

export default function ModalAdvertence({
  acceptLabel,
  message,
  onClose,
  onSubmit,
  open,
  rejectLabel,
  title,
  ...props
}) {
  return (
    <Modal
      {...props}
      header={title}
      className="c-search-actions__save-modal"
      onClose={onClose}
      open={open ? true : false}
      width={576}
    >
      <div className="c-modal-advertence">
        <p className="c-modal-advertence__message">
          {ReactHtmlParser(message)}
        </p>
        {onClose && rejectLabel && (
          <button
            type="button"
            onClick={onClose}
            className="c-modal-advertence__reject-button"
          >
            {rejectLabel}
          </button>
        )}
        {onSubmit && acceptLabel && (
          <button
            type="button"
            onClick={onSubmit}
            className="c-modal-advertence__accept-button"
          >
            {acceptLabel}
          </button>
        )}
      </div>
    </Modal>
  );
}
