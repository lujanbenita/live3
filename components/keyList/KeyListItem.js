import LetterAvatar from "components/common/avatar/LetterAvatar";

const KeyListItem = ({ item, setSelectedKeyList, selectedKeyList }) => {
  if (!item) return <></>;

  const isSelected = selectedKeyList?.filterId === item.filterId;
  const className = `c-keylist-item ${selectedKeyList ? "active" : ""} ${
    isSelected ? "current" : ""
  }`;

  const selectItem = () => setSelectedKeyList(item);
  let color = "blue";
  if (selectedKeyList) {
    color = "gray";
    if (isSelected) {
      color = "red";
    }
  }

  return (
    <div
      className={className}
      role="button"
      onKeyDown={selectItem}
      tabIndex={0}
      onClick={selectItem}
    >
      <LetterAvatar width={36} className="c-keylist-item__letter" color={color}>
        {item?.filterName[0] || "-"}
      </LetterAvatar>
      <span className="c-keylist-item__name" title={item?.filterName}>
        {item?.filterName}
      </span>
    </div>
  );
};

export default KeyListItem;
