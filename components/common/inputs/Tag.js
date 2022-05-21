import { Chip } from "@material-ui/core";
import { CloseRounded } from "@material-ui/icons";

const Tag = ({
  icon,
  extraClass = "",
  hideIcon = false,
  tone = undefined,
  onClick = () => {},
  tag,
  isSelected = "",
  ...props
}) => (
  <Chip
    {...props}
    onClick={() => {
      tag?.tagTypeName !== "Text" && onClick(tag);
    }}
    classes={{
      root: `c-tag c-tag--${icon} ${extraClass} ${
        Math.floor(tone) > 15 && "c-tag--positive-tone"
      } ${tone >= -15 && tone <= 15 ? "c-tag--neutral-tone" : ""}
      ${Math.floor(tone) < -15 && "c-tag--negative-tone"} ${
        isSelected && "c-tag--selected"
      }`,
    }}
    deleteIcon={
      hideIcon ? null : <CloseRounded classes={{ root: "c-tag__close-icon" }} />
    }
  />
);

export default Tag;
