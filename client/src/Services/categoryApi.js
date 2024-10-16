import axios from "axios";
import { useSelector } from "react-redux";
const token = JSON.parse(localStorage.getItem("userInfo") || null);
export const addCategory = async ({ name, type }) => {
  const response = await axios.post(
    `http://localhost:3000/api/v1/category/create`,
    { name, type },
    {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    }
  );
  return response.data;
};
export const getCategoryApi = async () => {
  const response = await axios.get(
    "http://localhost:3000/api/v1/category/get",
    {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    }
  );
  return response.data;
};
export const updateCategoryApi = async ({ name, type, id }) => {
  const url = `http://localhost:3000/api/v1/category/update`;
  const response = await axios.put(
    url,
    { name, type },
    {
      params: {
        id,
      },
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    }
  );
  return response.data;
};
export const DeleteCategoryApi = async (id) => {
  try {
    const url = `http://localhost:3000/api/v1/category/delete/${id}`;
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
