import { Modal } from "components/common/modal";

const KeyListModalConfirmation = ({
  tags = [],
  onSubmit,
  onClose,
  type,
  open,
  ...props
}) => (
  <Modal
    {...props}
    className="c-modal-keylist"
    onClose={onClose}
    open={open}
    width={576}
  >
    <div className="c-modal-advertence">
      <div className="c-modal-advertence__message">
        {tags.length === 0 && (
          <p className="c-modal-keylist__text">
            The {type} key list selected does not have any item.
          </p>
        )}
        {tags.length > 0 && (
          <>
            <p className="c-modal-keylist__text">
              The following {type} will be added to your filter:
            </p>
            <ul className="c-modal-keylist__tags">
              {tags.map((item) => (
                <li key={item.filterParameterId}>
                  {item.filterParameterValue}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <button
        type="button"
        onClick={onClose}
        className="c-modal-advertence__reject-button"
      >
        Cancel
      </button>
      {tags.length > 0 && (
        <button
          type="button"
          onClick={onSubmit}
          className="c-modal-advertence__accept-button"
        >
          Continue
        </button>
      )}
    </div>
  </Modal>
);

export default KeyListModalConfirmation;
