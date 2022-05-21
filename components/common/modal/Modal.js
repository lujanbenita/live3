import { Fade, Modal as ModalMat } from "@material-ui/core";
import classNames from "classnames";
import Spinner from "icons/Spinner";
import { Button } from "primereact/button";

export const Modal = ({
  header,
  children,
  className,
  width = 400,
  isLoading = false,
  "data-color": dataColor = null,
  style,
  ...props
}) => (
  <ModalMat
    // disableScrollLock
    {...props}
    style={{ maxWidth: width, ...style }}
    className={classNames("c-modal", className)}
    BackdropProps={{ className: "c-modal__backdrop" }}
  >
    <Fade in={props.open}>
      {isLoading ? (
        <div className="c-modal__loading">
          <Spinner />
        </div>
      ) : (
        <div className="c-modal__container">
          {header && (
            <header className="c-modal__header" data-color={dataColor}>
              <h2 className="c-modal__title">{header}</h2>
            </header>
          )}
          {/* <Button
            autoFocus
            onClick={props.onClose}
            icon="pi pi-times"
            className="c-modal__button p-button-rounded p-button-icon-only"
          /> */}
          <div className="c-modal__content">{children}</div>
        </div>
      )}
    </Fade>
  </ModalMat>
);
