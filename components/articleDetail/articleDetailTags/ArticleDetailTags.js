import _ from "lodash";
import { useDispatch } from "react-redux";

import Tag from "components/common/inputs/Tag";
import TagButton from "components/common/buttons/TagButton";

import { deleteCustomTag } from "services/customTags/customTagsServices";

import { formatTagType } from "utils/formatters";

import { updateArticleDetailCustomTags } from "redux/articleDetail/articleDetailActions";
import { useState } from "react";
import { highlightTopicsWords } from "../../../services/articleDetail/articleDetailServices";

const ArticleDetailTags = ({
  articleDetail,
  tags,
  customTags,
  openTagsModal,
  setHighlighterTag,
}) => {
  const groupedTags = _.chain(tags)
    .groupBy("tagTypeName")
    .map((value, key) => ({ type: key, tags: value }))
    .value();

  const dispatch = useDispatch();

  const [selectedTag, setSelectedTag] = useState("");

  const handleDelete = async (tag) => {
    const status = await deleteCustomTag({ articles: [articleDetail], tag });

    if (status === 200) {
      dispatch(
        updateArticleDetailCustomTags(
          [...customTags.filter((el) => el.customTagId !== tag.customTagId)],
          articleDetail
        )
      );
    }
  };

  const handleTagClick = async (tag) => {
    if (selectedTag === tag.tagName) {
      setSelectedTag("");
      return setHighlighterTag([""]);
    }

    const res = await highlightTopicsWords(tag.tagId);

    setSelectedTag(tag.tagName);
    if (res.status === 200) {
      const arrayKeywords = res.data.keywords.map((word) => word.keyword);
      return setHighlighterTag(arrayKeywords);
    }
    setHighlighterTag([tag.tagName]);
  };

  return (
    <div className="c-article-detail-tags">
      {groupedTags.map((group) => (
        <div className="c-article-detail-tags__group" key={group.type}>
          <span className="c-article-detail-tags__title">{group.type}</span>
          <div className="c-article-detail-tags__tags-container">
            {group.tags.map((tag, i) => (
              <div
                className="c-article-detail-tags__tooltip-container"
                key={tag.tagId}
              >
                <Tag
                  key={tag.tagId || i}
                  className={
                    selectedTag === tag.tagName
                      ? "c-article-detail-tags--custom-tag selected-tag"
                      : "c-article-detail-tags--custom-tag"
                  }
                  label={tag.tagName}
                  icon={formatTagType(group.type)}
                  tone={tag.sentimentScore}
                  hideIcon
                  onClick={() => handleTagClick(tag)}
                />

                <span
                  className="c-article-detail-tags__tooltip"
                  key={tag.tagname}
                >
                  {tag.tagName}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="c-article-detail-tags__group  c-article-detail-tags--custom-tags-group">
        <span className="c-article-detail-tags--custom-title">Custom Tags</span>
        <div className="c-article-detail-tags__tags-container">
          {customTags &&
            customTags.map((tag, i) => (
              <Tag
                key={tag.customTagId || i}
                className="c-article-detail-tags__tag c-article-detail-tags--custom-tag"
                label={tag.customTagName}
                icon="tag"
                onDelete={() => handleDelete(tag)}
              />
            ))}
        </div>
        <TagButton
          onClick={() => openTagsModal(articleDetail)}
          className="c-article-detail-tags__add-button"
        >
          Add Tag
        </TagButton>
      </div>
    </div>
  );
};

export default ArticleDetailTags;
