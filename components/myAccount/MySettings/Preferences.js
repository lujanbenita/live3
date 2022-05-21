import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState } from "react";

import ControlledInput from "components/common/inputs/ControlledInput";
import EditInput from "components/common/inputs/EditInput";
import ModalCard from "components/common/modal/ModalCard";

const Preferences = ({ onSubmit, defaultValues, isOpen = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const { control, handleSubmit } = useForm({ defaultValues });

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="c-preferences">
      <h2 className="c-my-settings__title">Preferences</h2>
      <EditInput
        label="NLA Credentials"
        onClick={() => {
          setIsModalOpen(true);
        }}
      />

      <ModalCard
        isOpen={isModalOpen}
        data-color="sky"
        handleClose={closeModal}
        width={450}
        handleCancel={closeModal}
        onConfirm={() => {
          handleSubmit(onSubmit)();
          closeModal();
        }}
        title="My NLA credentials"
        labelConfirm="Save Credentials"
      >
        <div className="c-preferences__modal-image">
          <Image
            src={`${process.env.PUBLIC_URL}/img/NLA.png`}
            width="150"
            height="136"
            alt="NLA logo"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ControlledInput
            control={control}
            label="My NLA Id"
            rules={{ required: false }}
            name="NLAId"
            className="c-input c-text-field--blue c-text-field--no-padding c-preferences__modal-input"
          />
          <ControlledInput
            control={control}
            rules={{ required: false }}
            type="password"
            label="My NLA Password"
            name="NLAPassword"
            className="c-input c-text-field--blue  c-text-field--no-padding c-preferences__modal-input"
          />
        </form>
      </ModalCard>
    </div>
  );
};

export default Preferences;
