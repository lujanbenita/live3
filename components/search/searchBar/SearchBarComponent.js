import SubmitButtonComponent from "components/common/buttons/SubmitButtonComponent";

const SearchBarComponent = ({ control, buttonEnabled, searchBar }) => (
  <div className="c-search-bar">
    <div className="c-search-bar__main">
      {searchBar && searchBar(control)}
      <SubmitButtonComponent
        buttonEnabled={buttonEnabled}
        className="c-search-bar__button"
      >
        <span>Search</span>
      </SubmitButtonComponent>
    </div>
  </div>
);
export default SearchBarComponent;
