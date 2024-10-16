import axios from "axios";
export const updateProfile = async ({ username, email }) => {
  const response = await axios.put(
    "http://localhost:3000/api/v1/user/updateProfile",
    { username, email },
    {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInfo")).token
        }`,
      },
    }
  );
  return response.data;
};
export const profileApi = async () => {
  const response = await axios.get(
    "http://localhost:3000/api/v1/user/profile",
    {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInfo")).token
        }`,
      },
    }
  );
  return response.data;
};
export const updatePassword = async (password) => {
  const response = await axios.put(
    "http://localhost:3000/api/v1/user/changePassword",
    {
      password,
    },
    {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInfo")).token
        }`,
      },
    }
  );
  return response.data;
};
