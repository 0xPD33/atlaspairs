import { useState, useEffect } from "react";
import "./AnimatedText.css";

const AnimatedText = () => {
  const texts = ["Real Yield", "Hedging", "Pair Trading", "Gaming"];

  const [textIndex, setTextIndex] = useState(0);
  const [text, setText] = useState(texts[textIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      setText(texts[textIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, [textIndex, texts]);

  return <h1 className="animated-text">{text}</h1>;
};

export default AnimatedText;
