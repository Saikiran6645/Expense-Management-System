import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeroSection from "./components/Home/Home";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import RegistrationForm from "./components/User/Register";
import LoginForm from "./components/User/Login";
import { useSelector } from "react-redux";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import AddCategory from "./components/Category/AddCategory";
import CategoriesList from "./components/Category/CategoriesList";
import UpdateCategory from "./components/Category/UpdateCategory";
import TransactionForm from "./components/Transactions/TransactionForm";
import TransactionList from "./components/Transactions/TransactionList";
import Dashboard from "./components/User/Dashboard";
import UpdateTrasaction from "./components/Transactions/UpdateTrasaction";
import UserProfile from "./components/User/UserProfile";
import PrivateHome from "./components/Home/privateHome";

function App() {
  const userdata = useSelector((state) => state?.auth?.user);
  return (
    <>
      <BrowserRouter>
        {userdata ? <PrivateNavbar /> : <PublicNavbar />}
        <Routes>
          {userdata ? (
            <Route path="/" element={<PrivateHome />} />
          ) : (
            <Route path="/" element={<HeroSection />} />
          )}
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/categories" element={<CategoriesList />} />
          <Route path="/update-category/:id" element={<UpdateCategory />} />
          <Route
            path="/update-transaction/:id"
            element={<UpdateTrasaction />}
          />
          <Route path="/add-transaction" element={<TransactionForm />} />
          <Route path="/transactions" element={<TransactionList />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
