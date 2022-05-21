import MultipleSelector from "components/common/inputs/MultipleSelector";

const TopicsFilter = ({ control, options }) => {
  const topicsMap = (element) => {
    const result = element?.map((el) => el.tagname);
    return result;
  };

  return (
    <MultipleSelector
      name="filterValues.topics"
      control={control}
      options={topicsMap(options.topics)}
      placeholder="Select Topics"
      label="Topics"
      className="c-filter-bar__selector c-filter-bar__selector--top"
    />
  );
};

export default TopicsFilter;
