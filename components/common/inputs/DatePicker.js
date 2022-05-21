import { DatePicker } from "rsuite";

const DatePickerInput = ({ dateValue, setDateValue }) => (
  <div className="field">
    <DatePicker
      value={dateValue}
      format="DD MMMM YYYY"
      className="c-date-picker"
      cleanable={false}
      placeholder="Select Date"
      onChange={(value) => {
        setDateValue(value);
      }}
      oneTap
    />
  </div>
);

export default DatePickerInput;
