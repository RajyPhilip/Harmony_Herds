import React from "react";
import "./Home.scss";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const navigateToPage = () => {
    navigate("/milking");
  };

  return (
    <div className=" main-home-page flex-column align-items-center justify-content-center gap-24">
      <div className="main-page-bg background-properties"></div>
      <h1 className="main-page-title">
        Increase Your Cattle Milking Capability
      </h1>
      <div
        onClick={navigateToPage}
        style={{ cursor: "pointer" }}
        className="main-page-milking-button p-12 flex-row align-items-center justify-content-center cursor-pointer  gap-12"
      >
        Try It Out
        <img
          width={20}
          height={20}
          src="https://d2k6zobmg5lufr.cloudfront.net/assets%2F20231130115125-Frame+2609384.svg"
          alt="forward-icon"
        />
      </div>
    </div>
  );
};

export default Home;
