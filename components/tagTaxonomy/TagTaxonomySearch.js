const TagTaxonomyInputSearch = ({ setSearch }) => (
  <div className="c-tag-taxonomy-search">
    <div className="c-tag-taxonomy-search__label">Select tag</div>
    <input
      className="c-tag-taxonomy-search__input"
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Add a tag"
    ></input>
  </div>
);

export default TagTaxonomyInputSearch;
