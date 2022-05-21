import classNames from "classnames";
import { Modal } from "./Modal";
import Button from "../buttons/Button";
import CancelButton from "../buttons/CancelButton";

const ModalCard = ({
  isOpen,
  color = "",
  title,
  children,
  labelConfirm,
  onConfirm,
  labelCancel = "Cancel",
  handleCancel,
  handleClose,
  width,
  className,
  bodyClassName = "",
  ...props
}) => (
  <Modal
    header={title}
    open={isOpen}
    width={width}
    onClose={handleClose}
    {...props}
  >
    <div className={classNames("c-modal-card", className)}>
      <div className={classNames("c-modal-card__body", bodyClassName)}>
        {children}
      </div>
      <div className="c-modal-card__footer">
        <Button onClick={onConfirm} type="submit" icon="save">
          {labelConfirm}
        </Button>
        <CancelButton onClick={handleCancel || handleClose}>
          {labelCancel}
        </CancelButton>
      </div>
    </div>
  </Modal>
);

export default ModalCard;
