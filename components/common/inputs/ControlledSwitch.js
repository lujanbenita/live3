import { useController } from "react-hook-form";
import { Switch as AntSwitch } from "antd";

function ControlledSwitch({
  control,
  name,
  rules,
  defaultValue = false,
  ...props
}) {
  const {
    field: { value, onChange, ...inputProps },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });
  return (
    <AntSwitch {...inputProps} {...props} onChange={onChange} checked={value} />
  );
}
export default ControlledSwitch;
