import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignupElements.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFname] = useState("");
  const [lastName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [usertype, SetUsertype] = useState("");
  const postData = () => {
    console.log(usertype);
    if (!/^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/.test(firstName)) {
      toast.error("Invalid First Name");
      return;
    }
    if (!/^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/.test(lastName)) {
      toast.error("Invalid Last Name");
      return;
    }
    if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone)) {
      toast.error("Invalid Phone Number");
      return;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      toast.error("Invalid Email ID");
      return;
    }
    fetch("http://localhost:5000/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        password,
        usertype,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          toast.error(data.error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.success(data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => navigate("/login"), 6000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <h1 className="signup-title">Sign Up</h1>
        <div className="signup-form">
          <input
            className="forminput"
            type="text"
            placeholder="First Name"
            required
            value={firstName}
            onChange={(e) => setFname(e.target.value)}
          />
          <input
            className="forminput"
            type="text"
            placeholder="Last Name"
            required
            value={lastName}
            onChange={(e) => setLname(e.target.value)}
          />
          <input
            className="forminput"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="forminput"
            type="text"
            placeholder="Phone"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            className="forminput"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <input
            className="forminput"
            type="password"
            placeholder="Confirm Password"
            required
            onChange={(e) => setCpassword(e.target.value)}
          />
          <select
            className="forminput"
            onChange={(e) => SetUsertype(e.target.value)}
          >
            <option selected="true" disabled="disabled" value={usertype}>
              Select User Type
            </option>
            <option>Customer</option>
            <option>Farmer</option>
          </select>
          <span className="agreement">
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
            <br></br>
            <Link className="router-link" to="/login">
              Already have an account?
            </Link>
          </span>
          <button onClick={() => postData()} className="signup-button">
            Register
          </button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Signup;
