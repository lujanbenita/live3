/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import ReactHtmlParser from "react-html-parser";
import { Modal } from "./Modal";

const ModalInfo = ({ onClose, message, open, acceptLabel, ...props }) => (
  <Modal
    {...props}
    className="info"
    onClose={onClose}
    open={open ? true : false}
    width={576}
  >
    <div className="c-modal-info">
      <div className="c-modal-info__close-icon" onClick={onClose}></div>
      <p className="c-modal-info__message">{ReactHtmlParser(message)}</p>
      <div className="c-modal-info__button-container">
        {onClose && acceptLabel && (
          <button
            type="button"
            onClick={onClose}
            className="c-modal-info__accept-button"
          >
            {acceptLabel}
          </button>
        )}
      </div>
    </div>
  </Modal>
);

export default ModalInfo;
