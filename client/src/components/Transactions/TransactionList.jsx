import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaTrash, FaEdit } from "react-icons/fa";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import {
  deleteTransaction,
  getTransactionApi,
} from "../../Services/transactionService";
import { getCategoryApi } from "../../Services/categoryApi";
import { Link } from "react-router-dom";

const TransactionList = () => {
  const [filter, setFilter] = useState({
    startDate: "",
    endDate: "",
    type: "",
    category: "",
  });

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const { data: categoryData } = useQuery({
    queryFn: getCategoryApi,
    queryKey: ["getCategory"],
  });
  const { data: transactions, refetch } = useQuery({
    queryFn: () => getTransactionApi(filter),
    queryKey: ["getTransactions", filter],
  });
  const DeleteMutation = useMutation({
    mutationFn: deleteTransaction,
    mutationKey: ["deleteTransaction"],
  });
  const handleDelete = (id) => {
    DeleteMutation.mutateAsync(id)
      .then((data) => {
        // console.log(data);
        refetch();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="my-4 p-4 shadow-lg rounded-lg bg-white">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Start Date */}
        <input
          type="date"
          name="startDate"
          value={filter.startDate}
          onChange={handleUpdate}
          className="p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        {/* End Date */}
        <input
          type="date"
          name="endDate"
          value={filter.endDate}
          onChange={handleUpdate}
          className="p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        {/* Type */}
        <div className="relative">
          <select
            name="type"
            value={filter.value}
            onChange={handleUpdate}
            className="w-full p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 appearance-none"
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <ChevronDownIcon className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        {/* Category */}
        <div className="relative">
          <select
            name="category"
            value={filter.category}
            onChange={handleUpdate}
            className="w-full p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 appearance-none"
          >
            <option value="">All category</option>
            <option value="uncatogorized">Uncatogorized</option>
            {categoryData?.map((category) => {
              return (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              );
            })}
          </select>

          <ChevronDownIcon className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>
      <div className="my-4 p-4 shadow-lg rounded-lg bg-white">
        {/* Inputs and selects for filtering (unchanged) */}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Filtered Transactions
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            {transactions?.map((transaction) => (
              <li
                key={transaction.id}
                className="bg-white p-3 rounded-md shadow border border-gray-200 flex justify-between items-center"
              >
                <div>
                  <span className="font-medium text-gray-600">
                    {new Date(transaction.date).toLocaleDateString()}
                  </span>
                  <span
                    className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.type === "income"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {transaction.type.charAt(0).toUpperCase() +
                      transaction.type.slice(1)}
                  </span>
                  <span className="ml-2 text-gray-800">
                    {transaction.category}
                  </span>
                  <span className="ml-2 text-gray-800">
                    - ₹{transaction.amount.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-600 italic ml-2">
                    {transaction.description}
                  </span>
                </div>
                <div className="flex space-x-3">
                  <Link to={`/update-transaction/${transaction.id}`}>
                    <button
                      onClick={() => handleUpdateTransaction(transaction.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(transaction._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
