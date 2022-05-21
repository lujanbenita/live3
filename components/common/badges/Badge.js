import { Badge } from "@material-ui/core";

const BadgeComponent = ({ children, value, size }) => (
  <Badge
    color="secondary"
    badgeContent={value}
    classes={{ root: `c-badge--${size}` }}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
  >
    {children}
  </Badge>
);

export default BadgeComponent;
