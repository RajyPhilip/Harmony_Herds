import React, { useEffect, useState } from "react";
import "./History.scss";
import { useNavigate } from "react-router-dom";
import { formatTimer } from "../../helpers/helper";
const History = () => {
  const navigate = useNavigate();
  const [historyList, setHistoryList] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const milkingHistory =
      JSON.parse(localStorage.getItem("milkingHistory")) || [];
    setHistoryList(milkingHistory);
  }, []);

  const navigateToPreviousPage = () => {
    navigate("/milking");
  };

  const convertTo12HourFormat = (time) => {
    const [hours24, minutes, seconds] = time.split(":").map(Number);
    const period = hours24 >= 12 ? "PM" : "AM";
    const hours12 = hours24 % 12 || 12;
    return `${hours12}:${minutes <= 9 ? `0${minutes}` : minutes}:${
      seconds <= 9 ? `0${seconds}` : seconds
    } ${period}`;
  };

  const handleExpansion = (index) => {
    if (windowWidth < 481) {
      if (expandedIndex === index) {
        setExpandedIndex(-1);
      } else {
        setExpandedIndex(index);
      }
    }
  };
  return (
    <div className="milk-history-content-page  p-16 flex-column gap-12 border-box">
      <div className="milk-history-upper-container full-width flex-row gap-8 align-items-center ">
        <img
          className="cursor-pointer"
          height={26}
          width={26}
          onClick={navigateToPreviousPage}
          src="https://d2k6zobmg5lufr.cloudfront.net/assets%2F20231102115707-chevron-back-circle.svg"
          alt="home-icon"
        />
        <h3 style={{ margin: "0px", flex: 1, textAlign: "center" }}>
          {" "}
          Cattle's Observations
        </h3>
      </div>
      <div className="milk-history-bottom-container">
        <div className=" milk-history-grid  milk-history-header-row    bold">
          <p className=" d-none768 header-row-item bold py-12 px-8">#</p>
          <p className="header-row-item bold py-12 px-8">Date</p>
          <p className="d-none768 header-row-item bold py-12 px-8">
            Song Played
          </p>
          <p className="header-row-item bold py-12 px-8 d-none480 ">
            Start Time
          </p>{" "}
          <p className="header-row-item bold py-12 px-8 d-none480 ">End Time</p>
          <p className="header-row-item bold py-12 px-8">
            <span className="d-none768">Total</span> Time Taken
          </p>
          <p className="header-row-item bold py-12 px-8">
            <span className="d-none768">Milking</span> Status
          </p>
          {windowWidth < 481 && (
            <p className="header-row-item bold py-12 px-8">Details</p>
          )}
        </div>
        <div className="milk-history-wrapper-scrollable-container">
          <div className="milk-history-scrollable-back-img background-properties"></div>
          <div className="milk-status-list-container flex-column gap-12">
            {historyList.map((detail, index) => {
              return (
                <div className={`${expandedIndex == index && "activeCard"} `}>
                  <div
                    key={index}
                    className="full-width Status-card-hover cursor-pointer "
                    onClick={() => handleExpansion(index)}
                  >
                    <div
                      key={index}
                      className="milk-history-grid  flex-row quote-status-list-header-row xetgo-font-tag cursor-pointer "
                    >
                      <p className=" d-none768 px-8 py-12">{index + 1}</p>

                      <p className="py-12 px-8">{detail.date}</p>
                      <p className="d-none768 py-12 px-8">
                        {detail.songPlayed}
                      </p>

                      <p className="d-none480 py-12 px-8">
                        {convertTo12HourFormat(detail.startTime)}
                      </p>

                      <p className="d-none480  py-12 px-8">
                        {convertTo12HourFormat(detail.endTime)}
                      </p>
                      <p className="py-12 px-8">
                        {formatTimer(detail.totalTimeTake)}
                      </p>
                      <p className="py-12 px-8">
                        {detail.milkingStatus > 0 ? detail.milkingStatus : 0}L
                      </p>
                      {windowWidth < 481 && (
                        <p className=" px-8 py-12">
                          <img
                            src="https://d2k6zobmg5lufr.cloudfront.net/assets%2F20231114094003-Vector+%28Stroke%29.svg"
                            alt="dropwon-icon"
                          />
                        </p>
                      )}
                    </div>
                  </div>
                  {expandedIndex === index && (
                    <div className="expanded-container flex-row align-items-center  gap-24">
                      <p className="py-12 px-8">
                        <span className="bold"> StartTime:</span>{" "}
                        {convertTo12HourFormat(detail.startTime)}
                      </p>

                      <p className=" py-12 px-8">
                        <span className="bold">EndTime:</span>
                        {"  "}
                        {convertTo12HourFormat(detail.endTime)}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {historyList.length === 0 && (
            <div
              style={{ height: "100%" }}
              className="flex-column align-items-center justify-content-center full-width milk-status-empty flex-1 gap-4"
            >
              <img
                height={32}
                width={32}
                src="https://d2k6zobmg5lufr.cloudfront.net/assets%2F20240327113954-Receipt.svg"
                alt="empty-state-icon"
              />
              <p> No Data Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
