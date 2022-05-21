const ScrollListTags = ({
  list,
  getLabel,
  maxHeight,
  counter,
  handleDelete,
}) => (
  <ul className="c-scroll-list-tags" style={{ maxHeight }}>
    <span className="c-scroll-list-tags__counter">{counter}</span>
    {list.map((item) => (
      <li className="c-scroll-list-tags__item" key={getLabel(item) || item}>
        <span className="c-scroll-list-tags__label">
          {getLabel(item) || item}
        </span>{" "}
        <button
          className="c-scroll-list-tags__button-delete"
          onClick={() => handleDelete(item)}
          type="button"
          aria-hidden="true"
        />
      </li>
    ))}
  </ul>
);

export default ScrollListTags;
