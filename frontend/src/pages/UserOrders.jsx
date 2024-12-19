import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { environment } from "../services/Environment";
import authHeader from "../services/auth-header";
import Axios from "axios";
import Table from "react-bootstrap/Table";

function UserOrders() {
  const [pageNumber, setPageNumber] = useState(0);
  const [orders, setOrders] = useState([]);
  const ordersPerPage = 1;
  const pagesVisited = pageNumber * ordersPerPage;

  useEffect(() => {
    function getMyOrders() {
      Axios.get(environment.baseUrlAPI + "/order", {
        headers: authHeader(),
      })
        .then((res) => {
          setOrders(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getMyOrders();
  }, [setOrders]);

  const displayOrders = orders
    .slice(pagesVisited, pagesVisited + ordersPerPage)
    .map((order) => {
      var OrderItems = order.orderItems.map((item) => {
        return (
          <tr key={item.product.id}>
            <td>{item.product.id}</td>
            <td>{item.product.name}</td>
            <td> $ {item.product.price} </td>
            <td> {item.quantity} </td>
            <td> $ {item.product.price * item.quantity} </td>
          </tr>
        );
      });
      return (
        <div key={order.id}>
          <b> Order's ID: {order.id} </b>
          <p>Tel: {order.userTel} </p>
          <p>Address: {order.userAddress} </p>
          <p>Date :{new Date(order.createdDate).toLocaleDateString()} </p>
          <p>
            {" "}
            <b> Products: </b>{" "}
          </p>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>ID </th>
                <th>Name</th>
                <th>Price </th>
                <th>Quantity </th>
                <th>Sum</th>
              </tr>
            </thead>
            <tbody>{OrderItems}</tbody>
          </Table>

          <p>Total Cost: $ {order.totalCost} </p>
          <hr />
        </div>
      );
    });
  const pageCount = Math.ceil(orders.length / ordersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div>
      <h3> {orders.length} ORDERS: </h3>
      {displayOrders}

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
  );
}

export default UserOrders;
