import MultipleSelector from "components/common/inputs/MultipleSelector";
import PublicationsSelector from "components/common/inputs/PublicationsSelector";
import AuthorsSelector from "components/common/inputs/AuthorsSelector";
import RangeSlider from "components/common/inputs/RangeSlider";

import { useDispatch } from "react-redux";
import { searchCustomTags } from "../../../redux/search/customTagsActions";
import MultipleSearchSelectorSimple from "../../common/inputs/MultipleSearchSelectorSimple";
import MultipleSearchSelectorFilter from "../../common/inputs/MultipleSearchSelectorFilter";

const FilterBarComponent = ({
  control,
  options,
  register,
  getValues,
  resetFilters,
  module,
}) => {
  const dispatch = useDispatch();
  return (
    <div className={module === "RI" ? "c-filter-bar ri" : "c-filter-bar"}>
      <MultipleSelector
        name="filterValues.source"
        control={control}
        options={options.sourceType}
        placeholder="Select Source Type"
        label="Source Type"
        className="c-filter-bar__selector"
      />
      <MultipleSelector
        name="filterValues.channel"
        control={control}
        options={options.channel}
        placeholder="Select Channel"
        label="Channel"
        className="c-filter-bar__selector"
      />
      <MultipleSelector
        name="filterValues.tone"
        control={control}
        options={options.tone}
        placeholder="Select Tone"
        label="Tone"
        className="c-filter-bar__selector c-filter-tone"
      />
      <PublicationsSelector control={control} register={register} />
      <AuthorsSelector control={control} register={register} />
      <MultipleSearchSelectorFilter
        className="c-filter-bar__selector c-filter-topic-tags"
        control={control}
        getValues={getValues}
        label="Topics"
        name="filterValues.tags"
        noOptionText="No topics found"
        options={options.tags?.map((item) => item.tagname)}
        placeholder="Select Topics"
        register={register}
      />
      <MultipleSearchSelectorSimple
        className="c-filter-bar__selector c-filter-custom-tags"
        control={control}
        getValues={getValues}
        handleSearch={(search) => dispatch(searchCustomTags(search))}
        label="Custom Tags"
        name="filterValues.customTags"
        noOptionText="No key custom tags found"
        options={options.customTags}
        placeholder="Select Custom Tags"
        register={register}
      />
      <RangeSlider
        label="Minimum circulation"
        control={control}
        name="filterValues.circulation"
        className="c-filter-bar__range-slider"
      />
      <button
        aria-hidden="true"
        type="button"
        title="Clear Filters"
        onClick={resetFilters}
        className="c-filter-bar__clear-button"
      ></button>
    </div>
  );
};

export default FilterBarComponent;
