/* eslint-disable no-nested-ternary */
import { ClickAwayListener } from "@material-ui/core";
import { createPortal } from "react-dom";
import { useState, useMemo } from "react";

import { AddIcon } from "icons/IconsLibrary";
import { useResponsive } from "utils/hooks/useResponsive";

import SingleSelector from "../inputs/SingleSelector";
import SpinnerRing from "../spinner/SpinnerRing";

const AddButton = ({
  action,
  label,
  extraClass = "",
  options,
  handleLoadOptions,
  noOptionsMessage,
  isLoadingOptions,
  position = "",
  addButtonModal = false,
}) => {
  const [list, setList] = useState({});
  const [isOpen, setIsOpen] = useState("");

  const { feedBreakpoint } = useResponsive();

  const handleChange = (value) => {
    setList(value);
  };

  useMemo(() => {
    if (isOpen) {
      (async () => {
        await handleLoadOptions();
      })();
    }
  }, [isOpen]);

  useMemo(() => {
    if (options) {
      handleChange(options[0]);
    }
  }, [options]);

  return (
    <ClickAwayListener
      mouseEvent="onMouseUp"
      onClickAway={() => {
        setIsOpen(false);
      }}
    >
      <div className="c-add-button">
        <button
          data-event="click focus"
          data-for="add-author"
          data-tip
          className={`c-add-button__button ${extraClass}`}
          type="button"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <AddIcon />
        </button>
        {feedBreakpoint || addButtonModal ? (
          createPortal(
            isOpen && (
              <>
                <div className="c-add-button__modal-backdrop">
                  <ClickAwayListener
                    mouseEvent="onMouseUp"
                    onClickAway={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                    }}
                  >
                    <div className="c-add-button__tooltip-modal">
                      {isLoadingOptions ? (
                        <SpinnerRing />
                      ) : options &&
                        options.length &&
                        options[0] !== undefined ? (
                        <>
                          <SingleSelector
                            className="c-add-button__select"
                            options={options || []}
                            label={label}
                            handleChange={handleChange}
                            placeholder="Select target list"
                            value={list}
                            getLabel={(el) => el.filterName}
                            MenuProps={{ disablePortal: true }}
                          />
                          <button
                            className="c-add-button__save--modal"
                            onClick={() => {
                              action(list);
                              setIsOpen(false);
                            }}
                            type="button"
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <span>{noOptionsMessage}</span>
                      )}
                    </div>
                  </ClickAwayListener>
                </div>
              </>
            ),
            document.body
          )
        ) : (
          <div
            className={`c-add-button__tooltip ${
              isOpen ? `c-add-button__tooltip--active` : ""
            }
          ${position && `c-add-button__tooltip--${position}`}
          `}
          >
            {isLoadingOptions ? (
              <SpinnerRing />
            ) : options && options.length && options[0] !== undefined ? (
              <>
                <SingleSelector
                  className="c-add-button__select"
                  options={options || []}
                  label={label}
                  handleChange={handleChange}
                  placeholder="Select target list"
                  value={list}
                  getLabel={(el) => el.filterName}
                />
                <button
                  className="c-add-button__save"
                  onClick={() => {
                    action(list);
                    setIsOpen(false);
                  }}
                  type="button"
                >
                  Save
                </button>
              </>
            ) : (
              <span>{noOptionsMessage}</span>
            )}
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default AddButton;
