import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import { DateRangePicker } from "rsuite";
import { subDays } from "date-fns";
import { useController } from "react-hook-form";

import { useResponsive } from "../../../utils/hooks/useResponsive";

const { combine, afterToday, allowedMaxDays } = DateRangePicker;

export const transformRelativeDates = (date) => {
  const today = new Date();
  if (date === "1D") {
    return [today, today];
  }

  if (date === "7D") {
    return [subDays(today, 7), today];
  }

  if (date === "1M") {
    return [subDays(today, 30), today];
  }

  return [new Date(date[0]), new Date(date[1])];
};

const DatePicker = ({ control, name }) => {
  const [isRelative, setIsRelative] = useState("c-date-picker");
  const [isOpen, setIsOpen] = useState(false);
  const { isLowerThan450 } = useResponsive();

  const {
    field: { ref, value, ...rest },
  } = useController({
    name,
    control,
  });

  useEffect(() => {
    if (value === "1D") {
      setIsRelative("c-date-picker-1D");
    }

    if (value === "7D") {
      setIsRelative("c-date-picker-7D");
    }

    if (value === "1M") {
      setIsRelative("c-date-picker-1M");
    }

    if (value !== "1D" && value !== "7D" && value !== "1M") {
      setIsRelative("c-date-picker");
    }
  }, [value]);

  return (
    <>
      {isOpen &&
        createPortal(
          <div className="c-date-picker__backdrop-overlay"></div>,
          document.body
        )}
      <div className="field">
        {value && (
          <DateRangePicker
            {...rest}
            value={transformRelativeDates(value)}
            format="DD MMMM YYYY"
            className="c-date-picker"
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            classPrefix={isRelative && isRelative}
            cleanable={false}
            placeholder="Select Date Range"
            placement="bottomEnd"
            disabledDate={combine(allowedMaxDays(92), afterToday())}
            showOneCalendar={isLowerThan450}
            ranges={[
              {
                label: "Custom Date Range",
              },
              {
                label: "1D",
                value: "1D",
              },
              {
                label: "7D",
                value: "7D",
              },
              {
                label: "1M",
                value: "1M",
              },
            ]}
          />
        )}
      </div>
    </>
  );
};

export default DatePicker;
