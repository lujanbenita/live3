import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Modal } from "components/common/modal";
import CustomMultipleTagsInput from "components/common/inputs/CustomMultipleTagsInput";
import { useDebouncedCallback } from "use-debounce";
import Tag from "components/common/inputs/Tag";

import {
  deleteCustomTag,
  assignCustomTags,
} from "services/customTags/customTagsServices";
import {
  fetchArticleDetail,
  updateArticleDetailCustomTags,
} from "redux/articleDetail/articleDetailActions";
import { searchCustomTags } from "../../../redux/search/customTagsActions";

// import formatTags from '../../../utils/servicesFormatter/formatTags';

const FeedModalTags = ({
  isOpen,
  handleClose,
  extraClass,
  width,
  color = "",
  title,
  selectedArticles,
}) => {
  const articleDetail = useSelector((state) => state.articleDetail);
  const searchTagOptions = useSelector(
    (state) => state.search.filterOptions.customTags
  );

  const { articleId, customTags } = articleDetail;

  const [selectedOptions, setSelectedOptions] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      selectedArticles &&
      selectedArticles.length === 1 &&
      articleId !== selectedArticles[0].articleId
    ) {
      (async () => {
        dispatch(fetchArticleDetail(selectedArticles[0]));
      })();
    }
  }, [selectedArticles]);

  const handleAddTags = async () => {
    const status = await assignCustomTags({
      articles: selectedArticles,
      tags: selectedOptions,
    });

    if (status === 201) {
      if (customTags && customTags.length) {
        dispatch(
          updateArticleDetailCustomTags(
            [
              ...customTags,
              ...selectedOptions.map((tag) => ({
                customTagName: tag,
                customTagId: Math.random(),
              })),
            ],
            articleDetail
          )
        );
      } else {
        dispatch(
          updateArticleDetailCustomTags(
            [
              ...selectedOptions.map((tag) => ({
                customTagName: tag,
                customTagId: Math.random(),
              })),
            ],
            articleDetail
          )
        );
      }
      setSelectedOptions([]);
    }
  };

  const handleDelete = async (tag) => {
    const status = await deleteCustomTag({ articles: selectedArticles, tag });

    if (status === 200) {
      dispatch(
        updateArticleDetailCustomTags(
          [...customTags.filter((el) => el.customTagId !== tag.customTagId)],
          articleDetail
        )
      );
    }
  };

  const handleSearch = useDebouncedCallback((query) => {
    dispatch(searchCustomTags(query));
  }, 300);

  const IsMoreThanOne = selectedArticles.length > 1;

  const NoResults = () => (
    <div className="c-feed-modal-tags__no-results">
      <p>
        There is no matches for your search,
        <br />
        If you want to create a new custom tag:
      </p>
      <div>
        <span className="c-feed-modal-tags__no-results-keyboard">
          Type your tag
        </span>
        +<span className="c-feed-modal-tags__no-results-keyboard">Enter</span>
      </div>
    </div>
  );

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      className={extraClass}
      width={width}
      header={`${title} (${
        IsMoreThanOne
          ? selectedArticles?.length
          : selectedArticles[0]?.publication
      } ${IsMoreThanOne ? "articles" : "article"})`}
    >
      {selectedArticles && selectedArticles.length > 0 && (
        <div className="c-modal-card c-feed-modal-tags">
          <div className="c-feed-modal-tags__input">
            <CustomMultipleTagsInput
              handleSearch={handleSearch}
              submitCTA="Add"
              noResults={<NoResults />}
              submitIcon="check"
              value={selectedOptions}
              options={searchTagOptions}
              setValue={setSelectedOptions}
              submitAction={handleAddTags}
              getLabel={(tag) => tag}
              getType={() => "tag"}
              placeholder="Type your tag + press enter to create a new tag"
            />
          </div>
          {!IsMoreThanOne && (
            <div className="c-feed-modal-tags__tags">
              <span className="c-feed-modal-tags__actual-tags-title">
                Custom tags on this article
              </span>
              <div className="c-feed-modal-tags__actual-tags">
                {customTags &&
                  customTags.map((tag) => (
                    <Tag
                      key={tag.customTagId}
                      label={tag.customTagName}
                      onDelete={() => handleDelete(tag)}
                      icon="tag"
                      extraClass="c-custom-multiple-tags-input__tag"
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default FeedModalTags;
