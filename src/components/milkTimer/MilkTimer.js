import React, { useEffect, useState } from "react";
import "./MilkTimer.scss";
import { useNavigate } from "react-router-dom";
import music1 from "../../assets/music/sample1.mp3";
import { formatTimer } from "../../helpers/helper";
import Modal from "simple-react-modal";

const MilkTimer = () => {
  const navigate = useNavigate();
  const [milkingStarted, setMilkingStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audio] = useState(new Audio());
  const [startTime, setStartTime] = useState(null);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [currentTime, setCurentTime] = useState(0);
  const [processEndDialogOpen, setProcessEndDialogOpen] = useState(false);
  const [inputValue, setInputValue] = useState(0);

  useEffect(() => {
    audio.addEventListener("ended", () => {
      setPlaying(false);
    });
    return () => {
      audio.removeEventListener("ended", () => {});
    };
  }, [audio]);

  const startMilking = () => {
    setPlaying(true);
    setMilkingStarted(true);
    setStartTime(new Date());
    audio.src = music1;
    audio.play();
  };

  const pauseMilking = () => {
    setPlaying(false);
    audio.pause();
  };

  const resumeMilking = () => {
    setPlaying(true);
    audio.play();
  };

  const stopMilking = () => {
    audio.pause();
    setPlaying(false);

    const currentTime = new Date();

    setProcessEndDialogOpen(true);
    setCurentTime(currentTime);
  };

  const handleNavigationtoHistory = () => {
    navigate("/history");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (audio && audio.currentTime) {
        setCurrentDuration(audio.currentTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [audio]);

  const handleCancel = () => {
    setProcessEndDialogOpen(false);
    setInputValue(0);
    setPlaying(true);
    audio.play();
  };

  const navigateToPreviousPage = () => {
    setPlaying(false);
    audio.pause();
    audio.src = music1;
    setCurentTime(0);
    setCurrentDuration(0);
    setMilkingStarted(false);
    navigate("/");
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value.trim();
    setInputValue(inputValue);
  };
  const handleMilkingSubmission = () => {
    const endTime = currentTime;
    const milkingData = {
      date: currentTime.toLocaleDateString(),
      songPlayed: audio.name || "SampleMusic1",
      startTime: startTime.toLocaleTimeString(),
      endTime: endTime.toLocaleTimeString(),
      totalTimeTake: currentDuration,
      milkingStatus: parseInt(inputValue),
    };

    const existingMilkingHistory =
      JSON.parse(localStorage.getItem("milkingHistory")) || [];
    existingMilkingHistory.push(milkingData);
    localStorage.setItem(
      "milkingHistory",
      JSON.stringify(existingMilkingHistory)
    );
    audio.src = music1;
    setMilkingStarted(false);
    setCurrentDuration(0);
    setProcessEndDialogOpen(false);
    setInputValue(0);
  };
  return (
    <div className="milking-main-page flex-row align-items-center justify-content-center">
      <div className="milking-page-bg background-properties"></div>

      <div className="milking-contents flex-column gap-24">
        <div className=" flex-row align-items-center ">
          <img
            className="cursor-pointer"
            height={26}
            width={26}
            onClick={navigateToPreviousPage}
            src="https://d2k6zobmg5lufr.cloudfront.net/assets%2F20231102115707-chevron-back-circle.svg"
            alt="home-icon"
          />
          <h2
            style={{ textAlign: "center", flex: 1 }}
            className="milking-contents-main-title "
          >
            Milking Timer
          </h2>
        </div>
        <div className="flex-row align-items-center justify-content-center">
          <div
            className={`${
              playing && "animation-bg"
            } outercircle bg flex-row align-items-center justify-content-center`}
          >
            <div className="innercircle">
              {audio.currentTime > 0 ? (
                <span>{formatTimer(audio.currentTime)}</span>
              ) : (
                <span>00m 00s</span>
              )}
            </div>
          </div>
        </div>
        {!milkingStarted && (
          <div className="flex-row justify-content-center align-items-center">
            <button className="btn-common-properties" onClick={startMilking}>
              Start Milking
            </button>
          </div>
        )}
        {milkingStarted && (
          <div className="flex-row gap-24 full-width align-items-center justify-content-center">
            {playing ? (
              <button className="btn-common-properties" onClick={pauseMilking}>
                Pause
              </button>
            ) : (
              <button className="btn-common-properties" onClick={resumeMilking}>
                Resume
              </button>
            )}
            <button className="btn-common-properties" onClick={stopMilking}>
              Stop
            </button>
          </div>
        )}
        <div
          className={`${
            milkingStarted && "view-hide"
          } full-width alaign-items-center justify-content-center flex-row`}
        >
          <div
            onClick={handleNavigationtoHistory}
            className="milking-view-history flex-row gap-4 cursor-pointer"
          >
            <img
              height={16}
              width={16}
              src="https://d2k6zobmg5lufr.cloudfront.net/assets%2F20240129144253-activity+%281%29.svg"
              alt="history-icon"
            />
            <p>View History</p>
          </div>
        </div>
      </div>
      <div className="main-modal-wrapper">
        <Modal show={processEndDialogOpen} onClose={handleCancel}>
          <span className="main-modal-box">
            <span className="flex-row position-relative">
              <input
                value={inputValue}
                onChange={handleInputChange}
                className="milk-form-input  px-12 py-10 xetgo-font-tag "
              />
              <span className="quantity-pipe xetgo-font-tag bold">
                | Liters
              </span>
            </span>
            <span className="milk-modal-btns-container justify-content-end flex-row gap-12 new-form-btn-container">
              <button
                onClick={handleCancel}
                className="cancel-btn xetgo-font-tag"
              >
                Cancel
              </button>
              <button
                onClick={handleMilkingSubmission}
                className="add-btn xetgo-font-tag"
              >
                Add milking status
              </button>
            </span>
          </span>
        </Modal>
      </div>
    </div>
  );
};

export default MilkTimer;
