import { formatTagType } from "@/utils/formatters";
import Tag from "components/common/inputs/Tag";

const TagTaxonomyTagsList = ({
  modalTags,
  modalSelectedTag,
  setModalTags,
  setModalSelectedTag,
}) => {
  const deleteTag = (deletedTag) => {
    const newModalTags = modalTags.filter(
      (tag) => tag.tagId !== deletedTag.tagId
    );
    setModalTags(newModalTags);
    if (modalSelectedTag?.tagId === deletedTag.tagId) {
      setModalSelectedTag(null);
    }
  };

  return (
    <div className="c-tags-list" key={JSON.stringify(modalTags)}>
      <div className="c-tags-list__label">Selected Tags</div>
      <div className="c-tags-list__wrapper">
        {modalTags.map((tag) => (
          <Tag
            key={tag.tagId}
            tag={tag}
            isSelected={modalSelectedTag?.tagId === tag.tagId}
            icon={formatTagType(tag.tagTypeName)}
            label={tag.tagName}
            onDelete={() => {
              deleteTag(tag);
            }}
            onClick={() => {
              setModalSelectedTag(tag);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TagTaxonomyTagsList;
