import axios from "axios";

async function patchUserNlaCredential(id, data) {
  const { data: response } = await axios.patch(
    `/api/users/${id}/nla-credential`,
    data
  );
  return response;
}

export default patchUserNlaCredential;
