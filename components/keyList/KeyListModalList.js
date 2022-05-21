const KeyListModalList = ({ title = "", keyLists = [], renderItem }) => {
  if (keyLists.length === 0) {
    return (
      <div className="c-modal-keylist__empty-wrapper">
        <p>No key {title} lists found</p>
      </div>
    );
  }

  return <>{keyLists.map((keyList) => renderItem(keyList))}</>;
};

export default KeyListModalList;
