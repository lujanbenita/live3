import axios from "axios";

async function patchUserPassword(id, data) {
  const { data: response } = await axios.patch(
    `/api/users/${id}/change-password`,
    data
  );
  return response;
}

export default patchUserPassword;
