import React, { useState, useContext } from "react";
import FormData from "form-data";
import { environment } from "../services/Environment";
import authHeader from "../services/auth-header";
import Axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, Navigate } from "react-router-dom";
import { CommonContext } from "../components/UCProvider";

function AddUpdateProduct() {
  var {
    setProducts,
    user,
    categories,
    provinceCities,
    districts,
    productAddUpdate,
  } = useContext(CommonContext);
  var navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [productId, setProductId] = useState(productAddUpdate.id);
  const [productName, setProductName] = useState(productAddUpdate.name);
  const [productDescription, setProductDescription] = useState(
    productAddUpdate.description
  );
  const [productPrice, setProductPrice] = useState(productAddUpdate.price);
  var [districtsList, setDistrictsList] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [districtId, setDistrictId] = useState(0);
  function handleProvinceCity(id) {
    //console.log("districts: " + districts);
    // Here ,id is string.Hence, in the following line, I have to write parseInt(id)
    var data = districts.filter((x) => x.provinceCity.id === parseInt(id));
    // console.log("data: " + JSON.stringify(data));
    // In the following line, I should not write setDistricts(data);
    //Otherwise ,there will be an error.For instance , first I selected "Hanoi", districts will be only districts of Hanoi
    // Then , I selected "Haiphong" ,districts will be [] because before districts were only districts of Hanoi
    setDistrictsList(data);
  }
  function Reset() {
    setProductId(0);
    setProductName("");
    setProductDescription("");
    setProductPrice(0);
    setCategoryId(0);
    setDistrictId(0);
    setFile(null);
  }
  function handleSubmit(e) {
    e.preventDefault();
    var formData = new FormData();

    var details = JSON.stringify({
      id: productId,
      name: productName,
      description: productDescription,
      price: productPrice,
      categoryId: categoryId,
      districtId: districtId,
    });
    formData.append("imageFile", file);
    formData.append("document", details);
    Axios.post(environment.baseUrlAPI + "/product", formData, {
      headers: authHeader(),
    })
      .then((res) => {
        //console.log(res.data);
        setProducts(res.data);
        Reset();
        navigate("/");
        Swal.fire({
          title: "Success!",
          text: "Saved Successfully.",
          icon: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        alert("Wrong ");
      });
  }

  return (
    <div>
      <h3>{productAddUpdate.id !== 0 ? <div>Edit</div> : <div>Create</div>}</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-1 mt-1">
          <label className="form-label">Name:</label>
          <input
            className="form-control"
            style={{ width: "300px" }}
            type="text"
            placeholder="Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="mb-1 mt-1">
          <label className="form-label">Description:</label>
          <textarea
            rows="3"
            className="form-control"
            style={{ width: "300px" }}
            placeholder="Description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-1 mt-1">
          <label className="form-label">Price:</label>
          <input
            className="form-control"
            style={{ width: "300px" }}
            type="number"
            placeholder="Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-1 mt-1">
          <label className="form-label"> Category: </label>
          <select
            required
            className="form-control"
            style={{ width: "300px" }}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="0"> Select Category: </option>
            {categories.map((category, index) => (
              <option key={index} value={category.id}>
                {" "}
                {category.name}{" "}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-1 mt-1">
          <label className="form-label"> Province/City: </label>
          <select
            required
            onChange={(e) => handleProvinceCity(e.target.value)}
            className="form-control"
            style={{ width: "300px" }}
          >
            <option value="0"> Select Province/City: </option>
            {provinceCities.map((provinceCity, index) => (
              <option key={index} value={provinceCity.id}>
                {" "}
                {provinceCity.name}{" "}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-1 mt-1">
          <label className="form-label"> District: </label>
          <select
            required
            className="form-control"
            style={{ width: "300px" }}
            onChange={(e) => setDistrictId(e.target.value)}
          >
            <option value="0"> Select District: </option>
            {districtsList.map((dt, index) => (
              <option key={index} value={dt.id}>
                {" "}
                {dt.name}{" "}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-1 mt-1">
          <label className="form-label">Image:</label>
          <input
            className="form-control"
            style={{ width: "300px" }}
            type="file"
            required
            accept="image/*"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
        </div>
        <button className="mb-1 mt-1 btn btn-success" type="submit">
          Submit
        </button>
      </form>
      {(!user || user.Role !== "Admin") && <Navigate to="/" />}
    </div>
  );
}

export default AddUpdateProduct;
