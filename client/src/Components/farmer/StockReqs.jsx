import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Stockreqs.scss";
import { Link } from "react-router-dom";

const StockReqs = () => {
  const [data, setData] = useState([]);
  //const [data1, setData1] = useState([]);
  


  useEffect(() => {
    fetch("http://localhost:5000/allreqs", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.requests);
      });
  }, []);

// const handleAddStock=()=>{

 
// }


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
              <td>{reqs.createdAt}</td>
             </tr>
             <br></br>
             {/* <button className="bttn" onClick={handleAddStock}>Send Request to Farmer 
          <SendIcon className="sendbtn" />
          </button> <br></br> */}
           
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
