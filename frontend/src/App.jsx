import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Category from "./pages/Category";
import Contact from "./pages/Contact";
import NoMatchPage from "./pages/NoMatchPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import UserOrders from "./pages/UserOrders";
import Admin from "./pages/Admin";
import AddUpdateProduct from "./pages/AddUpdateProduct";
import Orders from "./pages/Orders";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import CategoryAddUpdateModal from "./components/CategoryAddUpdateModal";
import ProductDetailsModalBody from "./components/ProductDetailsModalBody";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import UCProvider from "./components/UCProvider";
function App() {
  return (
    <UCProvider className="container-fluid mt-2">
      <BrowserRouter>
        <NavBar />
        <br /> <br /> <br /> <br />
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/UserOrders" element={<UserOrders />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/addupdateproduct" element={<AddUpdateProduct />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="*" element={<NoMatchPage />} />
            <Route element={<Header />} />
            <Route element={<CategoryAddUpdateModal />} />
          </Routes>
        </div>
        <Cart />
        <Footer />
      </BrowserRouter>
      <br /> <br />
    </UCProvider>
  );
}

export default App;
