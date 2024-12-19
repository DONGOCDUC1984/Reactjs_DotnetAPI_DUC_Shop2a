import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { environment } from "../services/Environment";
import "../style/Header.css";
import { CommonContext } from "./UCProvider";

function Header() {
  var {
    categories,
    setCategories,
    provinceCities,
    setProvinceCities,
    districts,
    setDistricts,
    setProducts,
  } = useContext(CommonContext);
  const [searchStr, setSearchStr] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [provinceCityId, setProvinceCityId] = useState(0);
  const [districtId, setDistrictId] = useState(0);
  var [districtsList, setDistrictsList] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
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
  function Reset(e) {
    e.preventDefault();
    setSearchStr("");
    setCategoryId(0);
    setProvinceCityId(0);
    setDistrictId(0);
    setMinPrice(0);
    setMaxPrice(0);
  }

  useEffect(() => {
    function searchProducts() {
      Axios.get(
        environment.baseUrlAPI +
          "/product" +
          "?searchStr=" +
          searchStr +
          "&categoryId=" +
          categoryId +
          "&provinceCityId=" +
          provinceCityId +
          "&districtId=" +
          districtId +
          "&minPrice=" +
          minPrice +
          "&maxPrice=" +
          maxPrice
      )
        .then((res) => {
          //console.log(res.data);
          setProducts(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    searchProducts();
  }, [
    searchStr,
    categoryId,
    provinceCityId,
    districtId,
    minPrice,
    maxPrice,
    setProducts,
  ]);

  useEffect(() => {
    function getAllCategories() {
      Axios.get(environment.baseUrlAPI + "/category")
        .then((res) => {
          // console.log(res.data);
          setCategories(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getAllCategories();
  }, [categories, setCategories]);

  useEffect(() => {
    function getAllDistricts() {
      Axios.get(environment.baseUrlAPI + "/district")
        .then((res) => {
          // console.log(res.data);
          setDistricts(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getAllDistricts();
  }, [districts, setDistricts]);

  useEffect(() => {
    function getAllProvinceCities() {
      Axios.get(environment.baseUrlAPI + "/provincecity")
        .then((res) => {
          // console.log(res.data);
          setProvinceCities(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getAllProvinceCities();
  }, [provinceCities, setProvinceCities]);

  return (
    <div className="container-fluid">
      <input
        className="m-1"
        type="text"
        value={searchStr}
        placeholder="Search..."
        onChange={(e) => setSearchStr(e.target.value)}
      ></input>
      <select
        className="m-1"
        style={{ height: "35px" }}
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
      <select
        className="m-1"
        style={{ height: "35px" }}
        onChange={(e) => {
          handleProvinceCity(e.target.value);
          setProvinceCityId(e.target.value);
        }}
      >
        <option value="0"> Select Province/City: </option>
        {provinceCities.map((provinceCity, index) => (
          <option key={index} value={provinceCity.id}>
            {" "}
            {provinceCity.name}{" "}
          </option>
        ))}
      </select>
      <select
        className="m-1"
        style={{ height: "35px" }}
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
      <label>Minimum Price:</label>
      <input
        type="number"
        placeholder="Minimum Price"
        className="m-1"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <label>Maximum Price:</label>
      <input
        type="number"
        placeholder="Maximum Price"
        className="m-1"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      <button className="m-1 btn btn-primary" onClick={Reset}>
        <FontAwesomeIcon icon={faBackward} /> Back To Full List
      </button>
    </div>
  );
}

export default Header;
