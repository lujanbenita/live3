import Selector from "@/components/common/inputs/Selector";
import { DropdownArrow } from "@/icons/IconsLibrary";

const StakeholdersFilter = ({ control, options }) => {
  const stakeholdersMap = (element) => {
    const result = element?.map((el) => el.tagname);
    return result;
  };

  return (
    <Selector
      name="filterValues.stakeholders"
      control={control}
      options={stakeholdersMap(options.stakeholders)}
      placeholder="Select Stakeholders"
      label="Stakeholders"
      className="c-filter-bar__selector c-filter-bar__selector--top c-extra-filter"
      popupIcon={<DropdownArrow />}
      classes={{
        // popupIndicator: "c-extra-filter__popup-indicator",
        inputRoot: "c-extra-filter__input-base",
        input: "c-extra-filter__input",
      }}
    />
  );
};

export default StakeholdersFilter;
