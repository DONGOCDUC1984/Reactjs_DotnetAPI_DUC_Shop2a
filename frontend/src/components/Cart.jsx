import React, { useState, useEffect, memo, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Offcanvas } from "react-bootstrap";
import Axios from "axios";
import Swal from "sweetalert2";
import { environment } from "../services/Environment";
import authHeader from "../services/auth-header";
import { CommonContext } from "./UCProvider";

function Cart() {
  var { cart, setCart, show, setShow, user } = useContext(CommonContext);
  const [tel, setTel] = useState("");
  const [address, setAddress] = useState("");

  function AddCartItem(productId) {
    if (!user) {
      Swal.fire("Please login");
    } else {
      Axios.get(`${environment.baseUrlAPI}/cart/AddCartItem/${productId}`, {
        headers: authHeader(),
      })
        .then((res) => {
          // With "setCart(res.data);" here,the website will be refreshed, not good.
          //setCart(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function DecreaseCartItem(productId) {
    Axios.get(`${environment.baseUrlAPI}/cart/DecreaseCartItem/${productId}`, {
      headers: authHeader(),
    })
      .then((res) => {
        // With "setCart(res.data);" here,the website will be refreshed, not good.
        //setCart(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function RemoveCartItem(productId) {
    Axios.delete(`${environment.baseUrlAPI}/cart/RemoveCartItem/${productId}`, {
      headers: authHeader(),
    })
      .then((res) => {
        // With "setCart(res.data);" here,the website will be refreshed, not good.
        //setCart(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function showTotal() {
    var sum = 0;
    cart?.cartItems?.map((item) => {
      return (sum += item.quantity * item.product.price);
    });
    return sum;
  }

  function handleOrder(e) {
    e.preventDefault();
    var orderDTO = {
      userTel: tel,
      userAddress: address,
      totalCost: showTotal(),
    };
    Axios.post(environment.baseUrlAPI + "/order", orderDTO, {
      headers: authHeader(),
    })
      .then(() => {
        setCart({});
        setTel("");
        setAddress("");
        Swal.fire({
          title: "Success!",
          text: "Ordered Successfully.",
          icon: "success",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    function getCart() {
      Axios.get(environment.baseUrlAPI + "/cart/", {
        headers: authHeader(),
      })
        .then((res) => {
          setCart(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getCart();
    // In the following line there should be "user".
    // Otherwise,when I log out then log in by another username, the cart will not change
  }, [setCart, cart, user]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <React.Fragment>
      <Offcanvas
        style={{ width: "550px" }}
        show={show}
        onHide={() => setShow(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h3>
              {" "}
              <FontAwesomeIcon icon={faCartShopping} /> Your Cart{" "}
            </h3>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {user && (
            <div>
              <table className="table table-hover bg-warning text-center mt-1  ">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Sum</th>
                    <th>Remove</th>
                  </tr>
                </thead>

                <tbody>
                  {cart?.cartItems?.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.product.id} </td>
                        <td>
                          {" "}
                          <img
                            src={
                              environment.baseUrl + "/" + item.product.imageUrl
                            }
                            alt=""
                            style={{ width: "4rem", height: "3rem" }}
                          />
                        </td>
                        <td>{item.product.name} </td>
                        <td>$ {item.product.price} </td>
                        <td>
                          <button
                            onClick={() => DecreaseCartItem(item.product.id)}
                            className="btn btn-primary btn-sm"
                          >
                            -
                          </button>
                          {item.quantity}
                          <button
                            onClick={() => AddCartItem(item.product.id)}
                            className="btn btn-primary btn-sm"
                          >
                            +
                          </button>{" "}
                        </td>
                        <td> $ {item.product.price * item.quantity} </td>
                        <td>
                          <button
                            onClick={() => RemoveCartItem(item.product.id)}
                            className="btn btn-danger   "
                          >
                            {" "}
                            <FontAwesomeIcon icon={faTrashCan} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <h3 className="text-center rounded bg-warning">
                TOTAL: $ {showTotal()}
              </h3>

              <div>
                <form className="mt-3" onSubmit={handleOrder}>
                  <label> Telephone: </label>
                  <br />
                  <input
                    type="text"
                    placeholder="Tel "
                    value={tel}
                    onChange={(event) => setTel(event.target.value)}
                    required
                  />

                  <br />
                  <label> Address: </label>
                  <br />
                  <input
                    type="text"
                    placeholder="Address "
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    required
                  />
                  <br />
                  <button className="btn btn-outline-info mt-3" type="submit">
                    <FontAwesomeIcon icon={faCartShopping} /> Order
                  </button>
                </form>
              </div>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </React.Fragment>
  );
}

export default memo(Cart);
