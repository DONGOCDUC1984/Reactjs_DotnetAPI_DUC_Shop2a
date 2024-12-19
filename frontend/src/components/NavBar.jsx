import React, { useContext } from "react";
import Axios from "axios";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHome } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../style/NavBar.css";
import shop1 from "../images/shop1.png";
import { environment } from "../services/Environment";
import { CommonContext } from "./UCProvider";

function NavBar() {
  var { setShow, cart, setCart, user, setUser, setProducts } =
    useContext(CommonContext);
  function searchProducts(categoryId, minPrice, maxPrice) {
    Axios.get(
      environment.baseUrlAPI +
        "/product" +
        "?searchStr=" +
        "" +
        "&categoryId=" +
        categoryId +
        "&provinceCityId=" +
        0 +
        "&districtId=" +
        0 +
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

  function logout() {
    setUser(null);
    setCart([]);
    localStorage.clear();
  }

  function handleLogout(e) {
    e.preventDefault();
    logout();
  }

  return (
    <Navbar bg="dark" variant="dark" expand="sm" fixed="top">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <img
              src={shop1}
              alt="shop1"
              className="logoshop1 m-1 rounded border border-primary"
              style={{ height: "40px", width: "40px" }}
            ></img>
            <h5 className="my-auto me-2">DUC SHOP</h5>
            <NavLink to="/" className="nav-link text-white">
              <FontAwesomeIcon icon={faHome} /> Home
            </NavLink>

            <NavLink to="/about" className="nav-link text-white">
              About
            </NavLink>
            <NavLink to="/contact" className="nav-link text-white">
              Contact
            </NavLink>
            {user && (
              <NavLink to="/UserOrders" className="nav-link text-white">
                My Orders
              </NavLink>
            )}
            {user && user.Role === "Admin" && (
              <>
                <NavDropdown title="Admin Pages" id="basic-nav-dropdown">
                  <NavLink to="/admin" className="nav-link text-dark">
                    Admin
                  </NavLink>
                  <NavLink to="/orders" className="nav-link text-dark">
                    Orders
                  </NavLink>
                  <NavLink to="/category" className="nav-link text-dark">
                    Category
                  </NavLink>
                </NavDropdown>
              </>
            )}

            {user ? (
              <>
                <div className="logout text-white mt-2" onClick={handleLogout}>
                  Log out
                </div>
              </>
            ) : (
              <>
                <NavLink to="/login" className="nav-link text-white">
                  Login
                </NavLink>

                <NavLink to="/register" className="nav-link text-white">
                  Register
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      {user && (
        <div className="d-flex flex-row">
          <NavLink
            to="/userprofile"
            className="nav-link text-white "
            style={{ width: "200px" }}
          >
            <FontAwesomeIcon icon={faUserCircle} /> {user.UserName}
          </NavLink>

          <div
            style={{ width: "150px" }}
            className="btn btn-primary rounded-pill me-3"
            onClick={() => {
              setShow(true);
            }}
          >
            <FontAwesomeIcon icon={faCartShopping} />{" "}
            <span className="badge bg-danger">{cart?.cartItems?.length}</span>{" "}
            Show cart
          </div>
        </div>
      )}
    </Navbar>
  );
}

export default NavBar;
