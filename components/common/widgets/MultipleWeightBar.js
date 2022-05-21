import ReactTooltip from "react-tooltip";

import { formatTagType } from "utils/formatters";

import Badge from "../badges/Badge";
import WeightBar from "./WeightBar";

const MultipleWeightBar = ({ tags, id }) => (
  <>
    <div
      data-tip
      data-for={`weight-tooltip-${id}`}
      className="c-multiple-weight-bar"
      data-iscapture="true"
    >
      <Badge size="small" value={tags.length > 1 ? tags.length : 0}>
        <div className="c-weight-bar__icon" />
      </Badge>
      <WeightBar
        weight={tags && tags != null && tags.length > 0 ? tags[0].weight : 0}
      />
    </div>
    <ReactTooltip
      delayShow={300}
      borderColor="rgba(0, 0, 0, 0.30)"
      multiline
      border
      backgroundColor="#fff"
      style={{ boxShadow: "2px 2px 8px 0 rgba(0, 0, 0, 0.1)" }}
      place="right"
      id={`weight-tooltip-${id}`}
      className="c-multiple-weight-bar__tooltip"
      effect="solid"
      eventOff="mouseleave mousewheel blur"
    >
      {tags.map((tag) => (
        <div className="c-multiple-weight-bar__row" key={tag.tagId}>
          <WeightBar weight={tag.weight} hideIcon />
          <span className="c-multiple-weight-bar__weight">
            {Math.floor(tag.weight)}
          </span>
          <span
            className={`c-multiple-weight-bar__class-name c-input-search-option--${formatTagType(
              tag.tagTypeName
            )}`}
          >
            {tag.tagName}
          </span>
        </div>
      ))}
    </ReactTooltip>
  </>
);

export default MultipleWeightBar;
