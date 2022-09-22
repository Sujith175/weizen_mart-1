import React, { useState } from "react";
import "./Fproducts.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams("");

  const [inpval, setINP] = useState({
    productName: "",
    photo: "",
    productPrice: "",
    productState: "",
    productQuantity: "",
    productDescription: "",
  });

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
        productQuantity,
        productState,
      }),
    });
    const data2 = await res2.json();
    console.log(data2);
    if (res2.status === 422 || data2) {
      alert("Product Added SuccessFully");
      navigate("/admin");
    } else {
      alert("data updated successfully");
    }
  };
  return (
    <div>
      <div class="card">
        <img height="200px" width="200px" src={inpval.photo} alt="" />
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
        <span id="label">Product Price:</span>{" "}
        <input
          className="text-input"
          type="text"
          name="productPrice"
          value={inpval.productPrice}
          onChange={setdata}
        ></input>
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
        <span id="label">Product Quantity:</span>{" "}
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
