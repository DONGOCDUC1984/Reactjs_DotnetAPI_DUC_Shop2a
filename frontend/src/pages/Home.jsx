import React, { useState, useEffect, memo, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faTrashCan,
  faPencil,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ReactPaginate from "react-paginate";
import "../style/Home.css";
import { environment } from "../services/Environment";
import authHeader from "../services/auth-header";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ProductDetailsModalBody from "../components/ProductDetailsModalBody";
import Header from "../components/Header";
import { CommonContext } from "../components/UCProvider";

function Home() {
  var { user, products, setProducts, setProductAddUpdate, setCart } =
    useContext(CommonContext);
  var navigate = useNavigate();
  // Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 10;
  const pagesVisited = pageNumber * productsPerPage;
  // Product's Details
  const [productDetails, setProductDetails] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const handleCloseDetails = () => setShowDetails(false);
  function handleShowDetails(e, id) {
    e.preventDefault();
    setShowDetails(true);
    var pr = products.filter((x) => x.id === id);
    // pr is an array with 1 member
    //console.log("pr[0].id: " + pr[0].id);
    setProductDetails(pr[0]);
  }

  function AddEdit(e, id) {
    e.preventDefault();
    if (id !== 0) {
      var data = products.filter((x) => x.id === id);
      // data is an array with 1 member
      //console.log("data[0].id: " + data[0].id);
      setProductAddUpdate(data[0]);
    } else {
      setProductAddUpdate({
        id: 0,
        name: "",
        description: "",
        price: 0,
        categoryId: 0,
        districtId: 0,
      });
    }
    navigate("/addupdateproduct");
  }

  function DeleteProduct(id) {
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
        Axios.delete(`${environment.baseUrlAPI}/product/${id}`, {
          headers: authHeader(),
        })
          .then((res) => {
            //console.log(res.data);
            setProducts(res.data);
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

  function AddCartItem(productId) {
    if (!user) {
      navigate("/login");
      Swal.fire("Please login");
    } else {
      Axios.get(`${environment.baseUrlAPI}/cart/AddCartItem/${productId}`, {
        headers: authHeader(),
      })
        .then((res) => {
          //Without "setCart(res.data);" here, I will have to refresh the website to see how the cart changes
          setCart(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    function getProducts() {
      Axios.get(environment.baseUrlAPI + "/product")
        .then((res) => {
          //console.log(res.data);
          setProducts(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getProducts();
  }, [setProducts]);

  const displayProducts = products
    .slice(pagesVisited, pagesVisited + productsPerPage)
    .map((product) => {
      return (
        <div
          className="col-sm-2 mt-3"
          key={product.id}
          style={{ width: "15rem" }}
        >
          <div className="card">
            <img
              className="card-img-top img-fluid"
              alt=""
              src={environment.baseUrl + "/" + product.imageUrl}
              style={{ height: "12rem" }}
            />
            <div className="card-body ">
              <h4 className="card-title">{product.name} </h4>
              <p className="card-text">
                <b>ID:</b> {product.id}{" "}
              </p>
              <p className="card-text">
                <b>Price: </b> {product.price} ${" "}
              </p>
              <p className="card-text">
                <b>Category: </b> {product.category.name}{" "}
              </p>
            </div>
          </div>

          <Button
            className="m-1"
            variant="success"
            onClick={(e) => handleShowDetails(e, product.id)}
          >
            Details
          </Button>
          <Modal show={showDetails} onHide={handleCloseDetails}>
            <Modal.Header closeButton>
              <Modal.Title>Details</Modal.Title>
            </Modal.Header>
            <ProductDetailsModalBody productDetails={productDetails} />
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDetails}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          {user && user.Role === "Admin" && (
            <div>
              <button
                type="button"
                className="btn btn-primary m-1"
                onClick={(e) => AddEdit(e, product.id)}
              >
                <FontAwesomeIcon icon={faPencil} /> Edit
              </button>
              <button
                onClick={() => DeleteProduct(product.id)}
                className="btn btn-danger m-1"
              >
                {" "}
                <FontAwesomeIcon icon={faTrashCan} /> Delete
              </button>
            </div>
          )}
          <button
            className="btn btn-info m-1"
            onClick={() => AddCartItem(product.id)}
          >
            <FontAwesomeIcon icon={faCartPlus} /> Add to cart
          </button>
        </div>
      );
    });
  const pageCount = Math.ceil(products.length / productsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div className="container mt-1">
      <Header />
      {user && user.Role === "Admin" && (
        <button
          type="button"
          className="btn btn-success mb-1"
          onClick={(e) => AddEdit(e, 0)}
        >
          <FontAwesomeIcon icon={faPlus} /> Create Product
        </button>
      )}

      <h3> Products </h3>
      <div className="row mx-auto">
        {displayProducts}

        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
      <div>
        {/*At the bottom,there should be at leat 3 <br /> s or 3 lines 
      more.Otherwise,when I click the bottom of the buttons of pagination,
      they will not work.
        */}
      </div>
      <br />
    </div>
  );
}

export default memo(Home);
