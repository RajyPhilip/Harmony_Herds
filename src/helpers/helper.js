export const formatTimer = (timer) => {
  if (timer === 0) {
    return "";
  }
  const minutes = Math.floor(timer / 60);
  const seconds = Math.floor(timer % 60); // Round off the seconds

  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  if (minutes === 0) {
    return `00m ${formattedSeconds}s`;
  } else {
    return `${formattedMinutes}m ${formattedSeconds}s`;
  }
};
