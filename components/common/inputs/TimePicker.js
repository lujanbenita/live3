import { ThemeProvider } from "@material-ui/styles";
import { TimePicker as TimePickerMat } from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core";
import { useController } from "react-hook-form";

const materialTheme = createMuiTheme({
  palette: {
    primary: { main: "#ff0050" },
  },
  typography: {
    fontFamily: ["Museo Sans", "Museo Slab"],
  },
  overrides: {
    MuiButton: {
      text: {
        "&:hover": {
          backgroundColor: "#ff0050 !important",
        },
      },
    },
    MuiInputBase: {
      root: {
        fontFamily: "Museo Sans",
        fontSize: "13px",
        fontWeight: 500,
        color: "#597d99",

        "&-focused": {
          color: "#597d99",
        },
      },
    },
  },
});

const TimePicker = ({ label, className = "", disable12h, control, name }) => {
  const {
    field: { ref, value, onChange },
  } = useController({
    name,
    control,
  });

  return (
    <ThemeProvider theme={materialTheme}>
      <TimePickerMat
        inputRef={ref}
        label={label}
        ampm={disable12h ? false : true}
        value={value}
        onChange={onChange}
        classes={{
          root: `c-time-picker ${className}`,
        }}
      />
    </ThemeProvider>
  );
};

export default TimePicker;
