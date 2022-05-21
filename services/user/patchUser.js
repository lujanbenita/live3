import axios from "axios";

async function patchUser(id, data) {
  const { data: response } = await axios.patch(`/api/users/${id}`, data);
  return response;
}

export default patchUser;
