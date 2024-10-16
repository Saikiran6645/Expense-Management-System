import axios from "axios";
const token = JSON.parse(localStorage.getItem("userInfo") || null);
export const addTransactionApi = async ({ amount, category, type, date }) => {
  const response = await axios.post(
    `http://localhost:3000/api/v1/transaction/create`,
    { amount, category, type, date },
    {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    }
  );
  return response.data;
};
export const getTransactionApi = async ({
  category,
  type,
  startDate,
  endDate,
}) => {
  const response = await axios.get(
    "http://localhost:3000/api/v1/transaction/filter",
    {
      params: {
        category,
        type,
        startDate,
        endDate,
      },

      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    }
  );
  return response.data;
};
export const deleteTransaction = async (id) => {
  const url = `http://localhost:3000/api/v1/transaction/delete/${id}`;
  console.log(id);
  const response = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  });
  return response.data;
};
