import React, { useState, useContext } from "react";
import { environment } from "../services/Environment";
import authHeader from "../services/auth-header";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import CategoryAddUpdateModal from "../components/CategoryAddUpdateModal";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CommonContext } from "../components/UCProvider";

function Category() {
  var { categories, setCategories, user } = useContext(CommonContext);
  // Category's Details
  const [categoryDetails, setCategoryDetails] = useState({ id: 0, name: "" });
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  function handleShowModal(e, id) {
    e.preventDefault();
    setShowModal(true);
    if (id !== 0) {
      var data = categories.filter((x) => x.id === id);
      // data is an array with 1 member
      //console.log("data[0].id: " + data[0].id);
      setCategoryDetails(data[0]);
    } else {
      setCategoryDetails({ id: 0, name: "" });
    }
  }

  function deleteCategory(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`${environment.baseUrlAPI}/category/${id}`, {
          headers: authHeader(),
        })
          .then((res) => {
            //console.log(res.data);
            setCategories(res.data);
            Swal.fire({
              title: "Deleted!",
              text: "Deleted Successfully.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }

  return (
    <div>
      <h3> {categories.length} Categories: </h3>
      <button
        type="button"
        className="btn btn-success mb-1"
        onClick={(e) => handleShowModal(e, 0)}
      >
        <FontAwesomeIcon icon={faPlus} /> Create
      </button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <CategoryAddUpdateModal
          categoryDetails={categoryDetails}
          handleCloseModal={handleCloseModal}
        />
      </Modal>

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => handleShowModal(e, category.id)}
                >
                  <FontAwesomeIcon icon={faPencil} /> Edit
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    deleteCategory(category.id);
                  }}
                >
                  <FontAwesomeIcon icon={faTrashCan} /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {(!user || user.Role !== "Admin") && <Navigate to="/" />}
    </div>
  );
}

export default Category;
