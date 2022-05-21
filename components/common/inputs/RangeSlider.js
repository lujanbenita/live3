import { useState, useEffect } from "react";
import { Typography, Slider } from "@material-ui/core";
import { useController } from "react-hook-form";
import styled from "@emotion/styled";

const StyledSlider = styled(Slider)`
  && {
    color: #ff0050;
  }
`;

const RangeSlider = ({ control, name, label, className = "", ...props }) => {
  const {
    field: { ref, value, onChange },
  } = useController({
    name,
    control,
  });
  const [rangeValue, setRangeValue] = useState([0, 100]);

  const valueLabelFormat = (labelValue) => {
    if (labelValue > 999 && labelValue < 999999) {
      return `${Math.floor(labelValue / 1000)}k`;
    }

    return labelValue;
  };

  useEffect(() => {
    if (!value || value === false) setRangeValue([0, 100]);
    else setRangeValue([value, 100]);
  }, [value]);

  // numberFormatter(labelValue);

  return (
    <div className={`c-range-slider ${className}`}>
      <Typography
        id="range-slider"
        gutterBottom
        className="c-range-slider__label"
      >
        {label}
      </Typography>
      <StyledSlider
        {...props}
        ref={ref}
        valueLabelDisplay="on"
        getAriaLabel={() => "slider label"}
        value={rangeValue}
        onChangeCommitted={(e, val) => {
          if (val[0] === 0) {
            onChange(false);
          } else {
            onChange([Math.ceil(val[0])]);
          }
        }}
        scale={(x) => x * 1000}
        onChange={(event, newValue) => {
          if (newValue[0] === 100) {
            setRangeValue([100, 100]);
          } else {
            setRangeValue([newValue[0], 100]);
          }
        }}
        getAriaValueText={(v) => v * 1000}
        valueLabelFormat={valueLabelFormat}
        classes={{
          root: "c-range-slider__slider",
          valueLabel: "c-range-slider__value-label",
          rail: "c-range-slider__rail",
        }}
      />
    </div>
  );
};

export default RangeSlider;
