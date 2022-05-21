import { Avatar } from "@material-ui/core";

const LetterAvatar = ({
  children,
  small = "",
  color = "",
  className = "",
  width = 36,
  ...props
}) => (
  <Avatar
    {...props}
    classes={{ root: className }}
    className={`c-letter-avatar ${small && "c-letter-avatar--small"} ${
      color && `c-letter-avatar--${color} ${className}`
    }`}
    style={{ width, height: width }}
  >
    {children[0].toUpperCase()}
  </Avatar>
);

export default LetterAvatar;
