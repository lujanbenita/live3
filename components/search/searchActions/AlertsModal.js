import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useWatch } from "react-hook-form";
import { MenuItem } from "@material-ui/core";
import Link from "next/link";
import { findTimeZone, getUTCOffset } from "timezone-support";

import TimePicker from "components/common/inputs/TimePicker";
import Button from "components/common/buttons/Button";
import CancelButton from "components/common/buttons/CancelButton";
import InputBoxTags from "components/common/inputs/InputBoxTags";
import { Modal } from "components/common/modal";
import useSavedSearchList from "hooks/rq/useSavedSearchList";
import { buildObjectSearch } from "../../../redux/search/searchUtils";
import ControlledInput from "../../common/inputs/ControlledInput";
import ControlledSelect from "../../common/inputs/ControlledSelect";
import ControlledSwitch from "../../common/inputs/ControlledSwitch";

import { saveAlert } from "../../../redux/alerts/alertActions";
import getSavedSearchList from "../../../services/saveSearch/getSavedSearchList";
import { validateAlert } from "./validateAlert";
import postSavedSearch from "../../../services/saveSearch/postSavedSearch";
import { saveSearchFormatDateRange } from "../../../utils/servicesFormatter/requests/formatDateRange";

const TYPE_OPTIONS = ["Pulse Alert", "Daily Alert", "Realtime Alert"];
const PULSE_OPTIONS = [
  { label: "15 minutes", value: "00:15" },
  { label: "30 minutes", value: "00:30" },
  { label: "1 Hour", value: "01:00" },
  { label: "2 Hour", value: "02:00" },
  { label: "3 Hour", value: "03:00" },
  { label: "4 Hour", value: "04:00" },
  { label: "6 Hour", value: "06:00" },
  { label: "8 Hour", value: "08:00" },
  { label: "12 Hours", value: "12:00" },
];

const AlertsModal = ({
  isModalOpen,
  setIsModalOpen,
  defaultValue,
  ...props
}) => {
  const searchObject = useSelector((state) => state.searchObject);

  const [savedSearches, setSavedSearches] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isToogleTrue, setIsToogleTrue] = useState(false);
  const user = useSelector((state) => state.user);

  const date = new Date();
  const currentTimezone = findTimeZone(user.timeZone || "Etc/UTC");
  const UTCOffset = getUTCOffset(date, currentTimezone).offset / 60;
  const sign = UTCOffset >= 0 ? "-" : "+";
  const GMT = `GMT${sign}${Math.abs(UTCOffset)}`;

  const { data: listSavedSearch } = useSavedSearchList();

  const { handleSubmit, setValue, watch, control, reset } = useForm();

  const type = watch("type");
  const createNewSearch = watch("toggleNewSearch");

  const dispatch = useDispatch();

  useWatch({ control, name: "deliveryInterval", defaultValue: "00:15" });

  useEffect(() => {
    setValue("deliveryInterval", "00:15");
  }, [type]);

  useEffect(() => {
    if (typeof createNewSearch === "boolean") {
      setIsToogleTrue(createNewSearch);
    }
  }, [createNewSearch]);

  useEffect(() => {
    const sortSavedSearches = savedSearches.map((x) => x);

    reset({
      type: "Pulse Alert",
      emails: [],
      alertName: "",
      deliveryInterval: "00:15",
      emailSubject: "",
      source:
        defaultValue ||
        (sortSavedSearches &&
          sortSavedSearches.length > 0 &&
          sortSavedSearches.sort((a, b) => {
            const dateA = new Date(a.lastUpdate);
            const dateB = new Date(b.lastUpdate);
            return dateA.getTime() < dateB.getTime() ? 1 : -1;
          })[0].workspaceName) ||
        "",
      howMany: "Only Best results",
      startTime: new Date(),
      deliveryTime: new Date(),
    });
  }, [savedSearches]);

  useEffect(() => {
    if (isModalOpen) {
      (async () => {
        const fetchedSavedSearches = await getSavedSearchList();
        setSavedSearches(
          fetchedSavedSearches.sort((a, b) =>
            a.workspaceName.toLowerCase() > b.workspaceName.toLowerCase()
              ? 1
              : -1
          )
        );
      })();
    }

    setErrors([]);
    reset();
  }, [isModalOpen]);

  const createSearchObject = (alertData) => {
    const dateRange = alertData.toggleDateRange
      ? saveSearchFormatDateRange(searchObject.dateRange)
      : null;

    const newBuildSearchObject = buildObjectSearch(searchObject);

    return {
      selectedTag: searchObject.selectedTag ? searchObject.selectedTag : null,
      dateRange,
      filterValues: newBuildSearchObject.filterValues,
      tags: newBuildSearchObject.tags,
      workspaceName: alertData.name,
    };
  };

  const submitAlert = async (data) => {
    const alertData = data;
    const thereAreErrors = await validateAlert(alertData, listSavedSearch);

    if (thereAreErrors) {
      setErrors(thereAreErrors);
      return;
    }

    let newSource = savedSearches.find(
      (el) => el.workspaceName === alertData.source
    );

    if (createNewSearch === true) {
      const newSearchObject = createSearchObject(alertData);
      const response = await postSavedSearch(newSearchObject);
      if (!response) {
        return;
      }
      const res = await getSavedSearchList();
      newSource = res.find((el) => el.workspaceName === alertData.name);
    }

    alertData.source = newSource;

    const success = await dispatch(
      saveAlert(
        {
          ...alertData,
          source: {
            name: alertData.source.workspaceName,
            id: alertData.source.workspaceId,
          },
        },
        user.timeZone
      )
    );
    if (success) {
      setIsModalOpen(false);
    }
  };

  return (
    <Modal
      width={390}
      open={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
      }}
      className="c-search-actions__save-modal"
      {...props}
    >
      <form
        id="alerts-form"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        aria-hidden="true"
        className="c-search"
      >
        <div className="c-save-search-modal">
          <div className="c-save-search-modal__form">
            <div className="c-switch c-save-search-modal__switch">
              <span className="c-switch__label">Based on a new Search</span>
              <ControlledSwitch
                name="toggleNewSearch"
                className="c-switch__switch"
                control={control}
                defaultValue={false}
              />
            </div>

            {isToogleTrue ? (
              <>
                <ControlledInput
                  control={control}
                  name="name"
                  className="c-save-search-modal__input c-save-search-modal__input--no-margin"
                  label="Name"
                  error={errors.find((e) => e.name === "name")}
                />

                <div className="c-switch c-save-search-modal__switch--border">
                  <span className="c-switch__label">
                    Save Search with Date Range
                  </span>
                  <ControlledSwitch
                    name="toggleDateRange"
                    className="c-switch__switch"
                    control={control}
                    defaultValue={false}
                  />
                </div>
              </>
            ) : (
              savedSearches && (
                <ControlledSelect
                  control={control}
                  name="source"
                  label="Source"
                  options={[
                    ...savedSearches.map((search) => search.workspaceName),
                  ]}
                  className="c-alerts-modal__full-width"
                >
                  {savedSearches.map((search) => (
                    <MenuItem
                      id={`menu-item-alert-${search.workspaceId}`}
                      key={search.workspaceId}
                      value={search.workspaceName}
                    >
                      {search.workspaceName}
                    </MenuItem>
                  ))}
                </ControlledSelect>
              )
            )}
            <hr className="c-alerts-modal__separator" />
            <ControlledInput
              label="Alert Name"
              control={control}
              name="alertName"
              className="c-alerts-modal__full-width--first"
              error={errors.find((e) => e.name === "alertName")}
            />
            <div className="c-alerts-modal__timezone">
              Your timezone:{" "}
              <strong>
                {user.timeZone} ({GMT})
              </strong>{" "}
              (
              <Link href="/my-account/my-settings">
                <a className="c-alerts-modal__link">configure</a>
              </Link>
              )
            </div>
            <div className="c-alerts-modal__row--grid">
              <ControlledSelect
                control={control}
                name="type"
                label="Type"
                className="c-alerts-modal__full-width"
              >
                {TYPE_OPTIONS.map((option) => (
                  <MenuItem
                    id={`menu-item-type-option-${Buffer.from(option).toString(
                      "base64"
                    )}`}
                    key={option}
                    value={option}
                  >
                    {option}
                  </MenuItem>
                ))}
              </ControlledSelect>

              {type === "Daily Alert" && (
                <div className="c-alerts-modal__select-wrapper">
                  <TimePicker
                    label="Delivery Time"
                    control={control}
                    name="deliveryTime"
                    disable12h
                    className="c-alerts-modal__full-width"
                  />
                </div>
              )}
              {type === "Pulse Alert" && (
                <div className="c-alerts-modal__select-wrapper">
                  <TimePicker
                    label="Start Time"
                    className="c-alerts-modal__full-width"
                    disable12h
                    control={control}
                    name="startTime"
                  />
                </div>
              )}
            </div>
            <div
              className={
                type === "Pulse Alert"
                  ? "c-alerts-modal__row--grid"
                  : "c-alerts-modal__row"
              }
            ></div>
            {type === "Pulse Alert" && (
              <ControlledSelect
                control={control}
                name="deliveryInterval"
                label="Delivery Interval"
                className="c-alerts-modal__full-width"
              >
                {PULSE_OPTIONS.map((option) => (
                  <MenuItem
                    id={`menu-pulse-options-${Buffer.from(
                      option.value
                    ).toString("base64")}`}
                    key={option.label}
                    value={option.value}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </ControlledSelect>
            )}
            <div
              className={
                type === "Pulse Alert"
                  ? "c-alerts-modal__row--grid"
                  : "c-alerts-modal__row"
              }
            ></div>
            <ControlledInput
              label="Email Subject"
              control={control}
              name="emailSubject"
              className="c-alerts-modal__full-width"
              error={errors.find((e) => e.name === "emailSubject")}
            />
            <InputBoxTags
              label="Enter Customized Emails"
              isControlled
              control={control}
              name="emails"
              className="c-alerts-modal__full-width"
              error={errors.find((e) => e.name === "emails")}
            />
            <div className="c-alerts-modal__buttons">
              <Button
                icon="save"
                onClick={handleSubmit((data) => {
                  submitAlert(data);
                })}
              >
                Save Alert
              </Button>
              <CancelButton
                className="c-save-search-modal__cancel-button"
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                Cancel
              </CancelButton>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AlertsModal;
