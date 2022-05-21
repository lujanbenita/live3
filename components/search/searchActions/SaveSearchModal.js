import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Button from "components/common/buttons/Button";
import CancelButton from "components/common/buttons/CancelButton";
import ControlledInput from "components/common/inputs/ControlledInput";
import ControlledSelect from "components/common/inputs/ControlledSelect";
import ControlledSwitch from "components/common/inputs/ControlledSwitch";
import { Modal } from "components/common/modal";

const SaveSearchModal = ({
  onSubmit,
  onClose,
  menuItemOptions,
  options,
  defaultValue,
  ...props
}) => {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const watchNewSearch = watch("toggleNewSearch");
  useEffect(() => {
    setValue("name", options[0]);
  }, []);

  useEffect(() => {
    if (watchNewSearch === true) {
      setValue("name", "", { shouldValidate: true, shouldDirty: true });
    }
  }, [watchNewSearch]);

  useEffect(() => {
    setValue("name", defaultValue, { shouldValidate: true, shouldDirty: true });
  }, [defaultValue]);

  const handleSaveSubmit = (data) => {
    if (data.name) {
      onSubmit(data);
    } else {
      setError("name", { message: "The saved search needs a name" });
    }
  };

  return (
    <Modal
      {...props}
      open
      onClose={onClose}
      width={390}
      className="c-search-actions__save-modal"
    >
      <div className="c-save-search-modal">
        <form className="c-save-search-modal__form">
          <div className="c-switch c-save-search-modal__switch">
            <span className="c-switch__label">Save as a new search</span>
            <ControlledSwitch
              name="toggleNewSearch"
              className="c-switch__switch"
              control={control}
              defaultValue={false}
            />
          </div>
          {watchNewSearch ? (
            <ControlledInput
              control={control}
              name="name"
              className="c-input c-save-search-modal__input"
              label="Name"
              error={errors.name}
              helperText={errors.name && "The saved search needs a name"}
            />
          ) : (
            <ControlledSelect
              control={control}
              label="Name"
              name="name"
              className="c-single-selector c-save-search-modal__selector"
              inputProps={{
                name: "name",
                id: "name",
              }}
              error={errors.name && "The saved search needs a name"}
            >
              {menuItemOptions}
            </ControlledSelect>
          )}

          <div className="c-switch c-save-search-modal__switch">
            <span className="c-switch__label">Save Search with Date Range</span>
            <ControlledSwitch
              name="toggleDateRange"
              className="c-switch__switch"
              control={control}
              defaultValue={false}
            />
          </div>

          <div className="c-save-search-modal__buttons">
            <Button
              icon="save"
              type="button"
              onClick={handleSubmit((data) => handleSaveSubmit(data))}
            >
              Save Search
            </Button>
            <CancelButton
              className="c-save-search-modal__cancel-button"
              onClick={onClose}
            >
              Cancel
            </CancelButton>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default SaveSearchModal;
