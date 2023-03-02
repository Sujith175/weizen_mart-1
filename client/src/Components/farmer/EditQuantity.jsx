import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styled from 'styled-components';
import { toast } from "react-toastify";


const EditQuantity = () => {
  const navigate = useNavigate();
  const { id } = useParams("");
  const [quantityErr,setQuantityErr] = useState(false)

  const Error =styled.span`
  color:red;
  padding:5px;
  `;

  const [inpval, setINP] = useState({
    productName: "",
    photo: "",
    productPrice: "",
    productState: "",
    productQuantity: "",
    productDescription: "",
    postedBy: "",
  });
  const [updatedQuantity,setUpdatedQuantity] = useState("");
  //const total = inpval.productPrice + updatedPrice;
  const setdata = (e) => {
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const getinfo = async () => {
    const res = await fetch(`http://localhost:5000/getproduct/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setINP(data);
  };
  useEffect(() => {
    getinfo();
  }, []);

  const updateProduct = async (e) => {
    e.preventDefault();

    const {
      productPrice,
      productName,
      productDescription,
      productQuantity,
      productState,
      postedBy,
    } = inpval;
    
    const res2 = await fetch(`http://localhost:5000/updateproduct/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productName,
        productDescription,
        productPrice,
        productQuantity:updatedQuantity,
        productState,
        postedBy,
      }),
    });
    const data2 = await res2.json();

    if (res2.status === 422 || data2) {
      alert("quantity Updated SuccessFully");
      navigate("/farmer/addedprods");
    } else {
      alert("data updated successfully");
    }
  };

  const handleQuantity = (e1)=>{
    if(updatedQuantity.match(/^[0-9\b]+$/)){
        console.log("Accepted")
    }
   else{
    setQuantityErr(true)
   }
   if(updatedQuantity>50){
    toast.error("Quantity above 50 cannot be added")
   }
}

  return (
    <div>
      <div class="card">
    
        <br></br>
        <img
          height="200px"
          width="200px"
          style={{ marginLeft: "5%", marginTop: "20px", marginBottom: "20px" }}
          src={inpval.photo}
          alt=""
        />
        <br></br>
        <span id="label">Product Name:</span>{" "}
        <input
          className="text-input"
          type="text"
          name="productPrice"
          value={inpval.productName}
          disabled
        ></input>
        <br></br>
        <span id="label">Product Price(INR/Kg):</span>{" "}
        <input
          className="text-input"
          type="text"
          name="productPrice"
          value={inpval.productPrice}
          disabled
        ></input>
        <br></br>
        <span id="label">Product State:</span>{" "}
        <input
          className="text-input"
          type="text"
          disabled
          name="productState"
          value={inpval.productState}
        ></input>
        <br></br>
        <span id="label">Product Quantity(Kg):</span>{" "}
        <input
          className="text-input"
          type="text"
          name="productQuantity"
          placeholder={inpval.productQuantity}
          value={updatedQuantity}
          onChange={(e) => setUpdatedQuantity(e.target.value)}
          onKeyUp={handleQuantity}
        ></input>
        {quantityErr&&!updatedQuantity.match(/^[0-9\b]+$/)?<Error>Enter a valid price!</Error>:""}
        {updatedQuantity>50?<Error>Quantity above 50 cannot be added</Error>:""}
        <br></br>
        <span id="label">Product Description:</span>{" "}
        <textarea
          className="text-input"
          type="text"
          disabled
          name="productDescription"
          value={inpval.productDescription}
          onChange={setdata}
        />
        <br></br>
        <button onClick={updateProduct} className="submit-btn">
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditQuantity;
