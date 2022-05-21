import SingleSelector from "../../common/inputs/SingleSelector";
import ControlledInput from "../../common/inputs/ControlledInput";
import LetterAvatar from "../../common/avatar/LetterAvatar";
import timeZonesList from "../../../data/timeZonesList";

const userBrowserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const UserBadge = ({ name, control, timezone, setTimezone }) => (
  <div className="c-user-badge">
    <div className="c-user-badge__avatar-container">
      <LetterAvatar className="c-user-badge__avatar">{name}</LetterAvatar>
    </div>
    <div className="c-user-badge__data">
      <h2 className="c-my-settings__title">My personal Data</h2>
      <ControlledInput
        className="c-input c-text-field--blue c-text-field--no-padding c-user-badge__input"
        control={control}
        label="Name"
        name="name"
        rules={{ required: true }}
      />
      <ControlledInput
        className="c-input c-text-field--blue c-text-field--no-padding c-user-badge__input"
        control={control}
        label="Last Name"
        name="lastName"
        rules={{ required: true }}
      />
      <ControlledInput
        control={control}
        className="c-input c-text-field--blue c-text-field--no-padding c-user-badge__input"
        label="Email"
        rules={{ required: true }}
        name="email"
      />
      <SingleSelector
        options={timeZonesList}
        value={timezone || userBrowserTimeZone}
        label="Timezone"
        handleChange={setTimezone}
        className="c-user-badge__timezone c-text-field--blue"
      />
    </div>
  </div>
);
export default UserBadge;
