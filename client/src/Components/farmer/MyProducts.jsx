import React, { useState, useEffect , useRef} from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useReactToPrint } from 'react-to-print';

const MyProducts = () => {

    const Image = styled.img`
    height: 200px;
    width: 300px;
    
  `;
  const componentRef = useRef();
  const [data, setData] = useState([]);
  const { id } = useParams("");

  const getinfo = async () => {
    const res = await fetch(`http://localhost:5000/myprods/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((result) => {
      setData(result.myproduct);
    });
  };
  useEffect(() => {
    getinfo();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'My Products',
  });

  return (
    <>
   <div ref={componentRef} style={{marginLeft:"10rem"}}>
    <h2 style={{marginBottom:"15px",marginLeft:"5rem",fontWeight:"bold",fontSize:"20px"}}>My  Products</h2>
    <table className="stocks">
            {data.map((prods) => (
              <div>
                {/* <tr>
                    <th>Product</th>
                    <td> <Image alt="" src={prods.photo} /></td>
                </tr> */}
             <tr>
              <th>Product Name</th>
              <td>{prods.productName}</td>
             </tr>
             <tr>
              <th>Product Quantity (Kg)</th>
              <td>{prods.productQuantity}</td>
             </tr>
             <tr>
              <th>Product Price (INR)</th>
              <td>{prods.productPrice}</td>
             </tr>
             <tr>
              <th>Product Added Date</th>
              <td>{prods.createdAt.substring(0,10)}</td>
             </tr>
            <br></br>
          <hr style={{width:"20rem",borderBlockColor:"gold"}}></hr>
             <br></br>
             </div>
            ))}
          </table>
          </div>
          <button  onClick={handlePrint} style={{
                                marginLeft:"17rem",
                                marginBottom:"2rem",
                                border: "none",
                                padding: "10px",
                                backgroundColor: "teal",
                                color: "white",
                                cursor: "pointer",
                                fontWeight: "bold",
                                fontSize: "medium",
                                fontFamily: "sans-serif"}}> Download </button> 
    </>
  )
}

export default MyProducts