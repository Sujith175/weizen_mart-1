import React from "react";
import { Link } from "react-router-dom";
import Announcement from "../Announcement";
import Categories from "../Categories";
import KommunicateChat from "../ChatBot/Chat";
import Footer from "../Footer";
import Newsletter from "../Newsletter";
// import Products from "../Products";
import Slider from "../Slider";

const Home = () => {
  return (
    <div>
      <Announcement />
      <Slider />
      <Categories />
      <KommunicateChat/>
      <Link
        style={{
          marginLeft: "90%",
          marginBottom: "10%",
          textDecoration: "none",
        }}
        to="/products"
      >
        View all products
      </Link>
      {/* <Products/> */}
    </div>
  );
};

export default Home;
