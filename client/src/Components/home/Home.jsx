import React from "react";
import { Link } from "react-router-dom";
import Announcement from "../Announcement";
import Categories from "../Categories";
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
