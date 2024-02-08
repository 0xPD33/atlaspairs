const zeroPad = (num, places) => String(num).padStart(places, "0");

export const getTimeLeftString = (secondsLeft) => {
  if (secondsLeft > 0) {
    const days = Math.floor(secondsLeft / (60 * 60 * 24));
    const hours = Math.floor((secondsLeft % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((secondsLeft % (60 * 60)) / 60);
    const seconds = Math.floor(secondsLeft % 60);

    // Display the countdown
    return (
      `${zeroPad(days, 2)}:${zeroPad(hours, 2)}:${zeroPad(minutes, 2)}:${zeroPad(seconds, 2)}`
    );
  }
  return "Phase has ended...";
};
