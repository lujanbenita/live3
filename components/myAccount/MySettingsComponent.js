import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback, useEffect } from "react";

import Button from "components/common/buttons/Button";
import TabsBar from "components/common/tabs/TabsBar";

import useModifyUser from "hooks/rq/useModifyUser";
import useUserChangeNLA from "hooks/rq/mySettings/useUserChangeNLA";
import useUserChangePassword from "hooks/rq/mySettings/useUserChangePassword";

import { MY_ACCOUNT_TABS } from "data/tabLinks";
import { showOnlyThisNotification } from "utils/feedbackBubbles";

import PasswordChange, {
  NEW_PASSWORD,
  CURRENT_PASSWORD,
} from "./MySettings/PasswordChange";
import Preferences from "./MySettings/Preferences";
import UserBadge from "./MySettings/UserBadge";
import { setUserData } from "../../redux/user/userActions";

const MySettingsComponent = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: user.firstName,
      lastName: user.lastName,
      email: user.username,
      timeZone: user.timeZone,
    },
  });

  const [timezone, setTimezone] = useState(null);

  useEffect(() => {
    setTimezone(user.timeZone);
  }, []);

  const modifyUserMutation = useModifyUser();
  const changeNLAMutation = useUserChangeNLA();
  const changePasswordMutation = useUserChangePassword();

  const onSubmitUserData = useCallback(
    (data) => {
      const newUserData = {
        firstName: data.name,
        lastName: data.lastName,
        username: data.email,
        timeZone: timezone,
      };

      modifyUserMutation.mutate(newUserData);
      dispatch(setUserData(newUserData));

      showOnlyThisNotification("User data updated.");
    },
    [modifyUserMutation]
  );

  const handleSubmitPassword = useCallback(
    (data) => {
      changePasswordMutation.mutate({
        password: data[NEW_PASSWORD],
        oldPassword: data[CURRENT_PASSWORD],
      });
    },
    [changePasswordMutation]
  );

  const handleSubmitNLA = useCallback(
    (data) => {
      const newNLAData = {
        nlaPassword: data.NLAPassword,
        nlaUsername: data.NLAId,
      };

      changeNLAMutation.mutate(newNLAData);
      dispatch(setUserData(newNLAData));
    },
    [changeNLAMutation]
  );

  // useMemo
  const NLADefaultValues = {
    NLAId: user.nlaUsername ? user.nlaUsername : "",
    NLAPassword: user.nlaPassword ? user.nlaPassword : "",
  };

  return (
    <div className="c-my-settings">
      <TabsBar tabs={MY_ACCOUNT_TABS} extraClassTab="c-my-settings__tab" />

      <div className="c-my-settings__section-container">
        <form
          onSubmit={handleSubmit(onSubmitUserData)}
          className="c-my-settings__main-section"
        >
          {user.firstName && (
            <UserBadge
              name={user.firstName[0]}
              control={control}
              timezone={timezone}
              setTimezone={setTimezone}
            />
          )}
          <Preferences
            onSubmit={handleSubmitNLA}
            defaultValues={NLADefaultValues}
          />
          <Button
            icon="save"
            type="submit"
            className="c-my-settings__submit-button"
          >
            Save Changes
          </Button>
        </form>
        <section className="c-my-settings__password-change-section">
          <PasswordChange onSubmit={handleSubmitPassword} />
        </section>
      </div>
    </div>
  );
};

export default MySettingsComponent;
