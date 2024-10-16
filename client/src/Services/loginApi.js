import axios from "axios";
export const LoginApi = async ({ email, password }) => {
  const response = await axios.post("http://localhost:3000/api/v1/user/login", {
    email,
    password,
  });

  return response.data;
};
export const RegisterApi = async ({ username, email, password }) => {
  const response = await axios.post(
    "http://localhost:3000/api/v1/user/register",
    {
      username,
      email,
      password,
    }
  );
  return response.data;
};


