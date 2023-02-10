import React, { useState } from "react";
import "./Fproducts.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styled from 'styled-components';


const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams("");
  const [updatedPrice, setUpdatedPrice] = useState();
  const [priceErr,setPriceErr] = useState(false)

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
  const total = inpval.productPrice + updatedPrice;
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
      photo,
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
        productPrice: total,
        productQuantity,
        productState,
        postedBy,
      }),
    });
    const data2 = await res2.json();

    if (res2.status === 422 || data2) {
      alert("Price Validated SuccessFully");
      navigate("/admin");
    } else {
      alert("data updated successfully");
    }
  };

  const handlePrice = (e1)=>{
    if(updatedPrice.match(/^[0-9\b]+$/)){
        console.log("Accepted")
    }
   else{
    setPriceErr(true)
   }
}

  return (
    <div>
      <div class="card">
        <label
          style={{
            marginLeft: "5%",
            fontSize: "20px",
            marginBottom: "20px",
            color: "#ab9b05",
          }}
        >
          This Product is added by : {inpval.postedBy.firstName}
        </label>
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
          onChange={setdata}
          disabled
        ></input>
        <br></br>
        <span id="label">Farmer Price(INR/Kg):</span>{" "}
        <input
          className="text-input"
          type="text"
          name="productPrice"
          value={inpval.productPrice}
          onChange={setdata}
          disabled
        ></input>
        <br></br>
        <span id="label">MSP Price(INR/Kg):</span>{" "}
        <input
          className="text-input"
          type="text"
          name="productPrice"
          onKeyUp={handlePrice}
          onChange={(e) => setUpdatedPrice(parseInt(e.target.value))}
          placeholder="MSP"
        ></input>
        {priceErr&&!updatedPrice.match(/^[0-9\b]+$/)?<Error>Enter a valid price!</Error>:""}
        <br></br>
        <span id="label">Total Amount: (INR/Kg)</span>{" "}
        {total ? (
          <input
            className="text-input"
            type="text"
            name="productPrice"
            disabled
            value={total}
          ></input>
        ) : (
          <input
            className="text-input"
            type="text"
            name="productPrice"
            disabled
            value="Please add your price"
          ></input>
        )}
        <br></br>
        <span id="label">Product State:</span>{" "}
        <input
          className="text-input"
          type="text"
          disabled
          name="productState"
          value={inpval.productState}
          onChange={setdata}
        ></input>
        <br></br>
        <span id="label">Product Quantity(Kg):</span>{" "}
        <input
          className="text-input"
          type="text"
          disabled
          name="productQuantity"
          value={inpval.productQuantity}
          onChange={setdata}
        ></input>
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

export default EditProduct;
