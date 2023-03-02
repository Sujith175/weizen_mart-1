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
      {/* <Products/> */}
      <Footer/>
    </div>
  );
};

export default Home;
