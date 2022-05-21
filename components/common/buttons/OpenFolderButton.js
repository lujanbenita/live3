const OpenFolderButton = ({ isActive = false, action, total }) => (
  <button
    className={`c-feed-table-info__folder-button ${
      isActive ? "c-feed-table-info__folder-button--active" : ""
    }`}
    type="button"
    onClick={action}
  >
    {`1/${total}`}
  </button>
);

export default OpenFolderButton;
