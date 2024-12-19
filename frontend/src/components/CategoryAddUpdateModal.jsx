import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Axios from "axios";
import Swal from "sweetalert2";
import { environment } from "../services/Environment";
import authHeader from "../services/auth-header";
import { CommonContext } from "./UCProvider";

function CategoryAddUpdateModal({ categoryDetails, handleCloseModal }) {
  var { setCategories } = useContext(CommonContext);
  const [newCategoryName, setNewCategoryName] = useState(categoryDetails.name);
  function handleSubmit(e) {
    e.preventDefault();
    Axios.post(
      `${environment.baseUrlAPI}/category/`,
      {
        id: categoryDetails.id,
        name: newCategoryName,
      },
      {
        headers: authHeader(),
      }
    )
      .then((res) => {
        handleCloseModal();
        //console.log(res.data);
        setCategories(res.data);
        Swal.fire({
          title: "Success!",
          text: "Saved Successfully.",
          icon: "success",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>
          {categoryDetails.id !== 0 ? <div>Edit</div> : <div>Create</div>}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          {categoryDetails.id !== 0 && (
            <div>
              <label> Id: </label>
              <br />
              <input type="number" value={categoryDetails.id} readOnly></input>
              <br />
            </div>
          )}

          <label> Name: </label>
          <br />
          <input
            type="text"
            placeholder="Name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            required
          ></input>
          <br />
          <button className="mt-1 btn btn-success" type="submit">
            Submit
          </button>
        </form>
      </Modal.Body>
    </div>
  );
}

export default CategoryAddUpdateModal;
