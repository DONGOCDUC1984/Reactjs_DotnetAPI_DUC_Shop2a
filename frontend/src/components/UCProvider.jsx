import React, { createContext, useState } from "react";
export var CommonContext = createContext();

function UCProvider(props) {
  var [cart, setCart] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {}
  );
  var [products, setProducts] = useState([]);
  var [categories, setCategories] = useState([]);
  var [districts, setDistricts] = useState([]);
  var [provinceCities, setProvinceCities] = useState([]);
  const [productAddUpdate, setProductAddUpdate] = useState({
    id: 0,
    name: "",
    description: "",
    price: 0,
    categoryId: 0,
    districtId: 0,
  });

  var [show, setShow] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [userName, setUserName] = useState("");
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [password2, setPassword2] = useState("");

  return (
    <CommonContext.Provider
      value={{
        cart,
        setCart,
        products,
        setProducts,
        categories,
        setCategories,
        districts,
        setDistricts,
        provinceCities,
        setProvinceCities,
        productAddUpdate,
        setProductAddUpdate,
        show,
        setShow,
        user,
        setUser,
        userName,
        setUserName,
        email,
        setEmail,
        password,
        setPassword,
        password2,
        setPassword2,
      }}
    >
      {props.children}
    </CommonContext.Provider>
  );
}

export default UCProvider;
