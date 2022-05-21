import React, { useState } from "react";
import { useController } from "react-hook-form";

import { Chip } from "@material-ui/core";

import { CloseIcon } from "../../../icons/IconsLibrary";

const InputBoxTags = ({ control, name, label, className = "", error }) => {
  const [option, setOption] = useState([]);

  const {
    field: { ref, value, onChange },
  } = useController({
    name,
    control,
    defaultValue: [],
  });

  const handleSelect = (el) => {
    setOption("");
    if (value && value.length > 0) {
      onChange([...value, el]);
    } else {
      onChange([el]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSelect(option);
    }
  };

  const handleDelete = (item) => {
    onChange(value.filter((el) => el !== item));
  };

  return (
    <div className={`c-input-box-tags ${className}`}>
      <span className="c-input-box-tags__label">{label}</span>
      {error && (
        <span className="c-input-box-tags--error">{error.message}</span>
      )}
      <div className="c-input-box-tags__container">
        {value.map((item) => (
          <Chip
            key={item}
            label={item}
            deleteIcon={<CloseIcon className="c-input-box-tags__close-icon" />}
            onDelete={() => handleDelete(item)}
            className="c-input-box-tags__chip"
          />
        ))}
        <input
          placeholder="add email"
          ref={ref}
          value={option}
          onChange={(e) => {
            setOption(e.target.value);
          }}
          onKeyDown={(e) => handleKeyPress(e)}
          className="c-input-box-tags__input"
        />
      </div>
    </div>
  );
};

export default InputBoxTags;
