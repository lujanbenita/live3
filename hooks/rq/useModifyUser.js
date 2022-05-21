import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";

import patchUser from "services/user/patchUser";
import { setUserData } from "redux/user/userActions";
import { USE_MODIFY_USER } from "./reactQueryTypes";

const useModifyUser = (options) => {
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();

  const mutation = useMutation(
    USE_MODIFY_USER,
    (data) => userId && patchUser(userId, data),
    {
      ...options,
      // cacheTime: Infinity,
      // staleTime: Infinity,
      onSuccess: (data, variables) => {
        dispatch(setUserData(variables));
      },
    }
  );

  return mutation;
};

export default useModifyUser;
