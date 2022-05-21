import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Modal } from "@/components/common/modal";
import { Check } from "@/icons/IconsLibrary";
import { setData } from "@/redux/searchObject/actions";

import TagTaxonomySearch from "./TagTaxonomySearch";
import TagTaxonomyTree from "./TagTaxonomyTree";
import TagTaxonomyTagsList from "./TagTaxonomyTagsList";

const TagTaxonomyModal = ({ whitelist, open, setOpen, ...props }) => {
  const searchObject = useSelector((state) => state.searchObject);
  const tags = useSelector((state) => state.searchObject.tags);
  const selectedTag = useSelector((state) => state.searchObject.selectedTag);
  const [search, setSearch] = useState("");
  const [modalTags, setModalTags] = useState([]);
  const [modalSelectedTag, setModalSelectedTag] = useState(null);

  const dispatch = useDispatch();

  const addTag = (tagData) => {
    const modalTagsIds = modalTags.map((tag) => tag.tagId);
    if (modalTagsIds.includes(tagData.tagId)) return;
    const newModalTags = [...modalTags];

    newModalTags.push({
      tagId: tagData.tagId,
      tagName: tagData.name,
      tagTypeName: tagData.tagTypeName,
    });
    setModalTags(newModalTags);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const updateTags = () => {
    const data = {
      ...searchObject,
    };
    data.selectedTag = modalSelectedTag;
    data.tags = modalTags;
    dispatch(setData(data));
    setOpen(false);
  };

  useEffect(() => {
    setModalTags(tags);
    setModalSelectedTag(selectedTag);
  }, []);

  return (
    <Modal
      className="c-modal-tag-taxonomy"
      onClose={closeModal}
      open={open}
      header="Tag selection"
      {...props}
    >
      <div className="c-modal-tag-taxonomy__wrapper">
        <div className="c-modal-tag-taxonomy__body">
          <TagTaxonomySearch search={search} setSearch={setSearch} />
          <div
            className="c-modal-tag-taxonomy__scroll-container"
            id="scrollableTagsTreeDiv"
            style={{
              height: 390,
              overflowY: "auto",
            }}
          >
            <TagTaxonomyTree
              whitelist={whitelist}
              searchTerm={search}
              setSearchTerm={setSearch}
              addTag={addTag}
            />
          </div>
          <TagTaxonomyTagsList
            modalTags={modalTags}
            modalSelectedTag={modalSelectedTag}
            setModalTags={setModalTags}
            setModalSelectedTag={setModalSelectedTag}
          />
        </div>

        <div className="c-modal-tag-taxonomy__footer">
          <button
            type="button"
            className="c-modal-tag-taxonomy__button"
            onClick={updateTags}
            disabled={!modalTags}
          >
            <Check />
            <span>Update search tags</span>
          </button>
          <span
            className="c-modal-tag-taxonomy__cancel"
            role="button"
            tabIndex={0}
            onKeyDown={closeModal}
            onClick={closeModal}
          >
            Cancel
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default TagTaxonomyModal;
