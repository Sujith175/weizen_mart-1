import React from "react";
import Chart from "../Components/Chart/Chart"
import FeaturedInfo from "../Components/featuredInfo/FeaturedInfo";
import "./Home.css";
import WidgetLg from "../Components/widgetLg/WidgetLg";
import WidgetSm from "../Components/widgetSm/WidgetSm";
import {userData} from "../Components/dummyData";

export default function Home() {
  return (
    <div className="home" style={{width:"100%"}}>
      <FeaturedInfo />
      <Chart data={userData} title="User Analytics" grid dataKey ="Active Users"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}