import React from "react";
import { environment } from "../services/Environment";
import Modal from "react-bootstrap/Modal";

function ProductDetailsModalBody({ productDetails }) {
  return (
    <div>
      <Modal.Body>
        <img
          alt=""
          src={environment.baseUrl + "/" + productDetails.imageUrl}
          style={{ height: "15rem", width: "15rem" }}
        />
        <h4>{productDetails.name} </h4>
        <p>
          {" "}
          <b>ID:</b> {productDetails.id}{" "}
        </p>
        <p>
          {" "}
          <b>Price: </b> {productDetails.price} ${" "}
        </p>
        <p>
          {" "}
          <b>Category: </b> {productDetails.category.name}{" "}
        </p>
        <p>
          {" "}
          <b>Description: </b> {productDetails.description}{" "}
        </p>
        <p>
          {" "}
          <b>Province/City: </b> {productDetails.district.provinceCity.name}{" "}
        </p>
        <p>
          {" "}
          <b>District: </b> {productDetails.district.name}{" "}
        </p>
      </Modal.Body>
    </div>
  );
}

export default ProductDetailsModalBody;
