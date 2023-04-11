import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./Stockreqs.scss";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";


const StockReqs = () => {
  const [data, setData] = useState([]);
  
  const { id } = useParams("");

  // useEffect(() => {
  //   fetch("http://localhost:5000/adminreqs", {
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("jwt"),
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       setData(result.farmrrequests);
  //     });
  // }, []);

  const getinfo = async () => {
    const res = await fetch(`http://localhost:5000/adminreqs/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((result) => {
      setData(result.farmrrequests);
    });
    // const data = await res.json();
    //setINP(data);
  };
  useEffect(() => {
    getinfo();
  }, []);

  return (
    <>
    
          <table className="stocks">
            {data.map((reqs) => (
              <div>
             <tr>
              <th>Product Name</th>
              <td>{reqs.productName}</td>
             </tr>
             <tr>
              <th>Requested User</th>
              <td>{reqs.firstName}</td>
             </tr>
             <tr>
              <th>User Phone</th>
              <td>{reqs.phone}</td>
             </tr>
             <tr>
              <th>User Email</th>
              <td>{reqs.email}</td>
             </tr>
             <tr>
              <th>Requested Date & Time</th>
              <td>{reqs.createdAt.substring(0,10)}</td>
             </tr>
            <br></br>
            {reqs.productQuantity>0?<h3 className="stockadded" style={{fontWeight:"bold"}}>Stock Added</h3>:<h3 style={{fontWeight:"bold"}} className="stocknotadded">Stock not added</h3>}
            <br></br>
          <Link className="bttn" to={`/editquantity/${reqs.productId}`}> Add Stock
          </Link>
          <br></br>
          <br></br>
          <hr style={{width:"35rem",borderBlockColor:"gold"}}></hr>
             <br></br>
             </div>
            ))}
          </table>
    </>
  );
};

export default StockReqs;
