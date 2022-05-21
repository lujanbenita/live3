import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Steps } from "intro.js-react";

import patchUser from "@/services/user/patchUser";
import { changeTutorialSettings } from "@/redux/user/userActions";

const Tutorial = ({ settings, steps }) => {
  const user = useSelector((state) => state.user);
  const [enabled, setEnabled] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.jsonData) return;
    const tutorialSettings = JSON.parse(user.jsonData)?.tutorial || {};
    if (!(settings.settingName in tutorialSettings)) {
      setEnabled(true);
      return;
    }
    setEnabled(tutorialSettings[settings.settingName]);
  }, [user]);

  const onExit = () => {
    if (!enabled) {
      return;
    }
    setEnabled(false);
    dispatch(changeTutorialSettings(settings.settingName, false));
    const oldJsonData = JSON.parse(user.jsonData);
    const updatedUserData = {
      jsonData: JSON.stringify({
        ...oldJsonData,
        tutorial: {
          ...oldJsonData?.tutorial,
          ...settings.disableValues,
        },
      }),
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      nlaPassword: user.nlaPassword,
      nlaUsername: user.nlaUsername,
      timeZone: user.timeZone,
      userEmail: user.userEmail,
      username: user.username,
    };
    patchUser(user.id, updatedUserData);
  };

  const token = useSelector((state) => state.user.token);

  if (!token) return <></>;

  return (
    <Steps
      initialStep={0}
      enabled={enabled}
      steps={steps}
      options={{
        showBullets: false,
        overlayOpacity: 0.8,
        scrollToElement: true,
      }}
      onExit={onExit}
    />
  );
};

export default Tutorial;
