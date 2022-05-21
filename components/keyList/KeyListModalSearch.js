import { TextField, InputAdornment } from "@material-ui/core";
import { MagnifierGlass } from "icons/IconsLibrary";

const KeyListModalSearch = ({ setSearch }) => (
  <div className="c-modal-keylist__search-form">
    <TextField
      variant="standard"
      label="Enter Search term"
      onChange={(e) => setSearch(e.target.value)}
      className="c-modal-keylist__search-input"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <MagnifierGlass />
          </InputAdornment>
        ),
      }}
    />
  </div>
);

export default KeyListModalSearch;
