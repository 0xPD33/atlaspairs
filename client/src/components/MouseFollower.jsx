import { useState, useEffect, useRef } from "react";
import { useLocalSettingsStore } from "./localSettings";
import "./MouseFollower.css";

function MouseLightFollower() {
  const showMouseLight = useLocalSettingsStore((state) => state.showMouseLight);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef();

  useEffect(() => {
    const lerp = (a, b, n) => (1 - n) * a + n * b;
    const handleMouseMove = (event) => {
      mousePositionRef.current = { x: event.clientX, y: event.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      if (!showMouseLight) return;

      const newX = lerp(position.x, mousePositionRef.current.x, 0.2);
      const newY = lerp(position.y, mousePositionRef.current.y, 0.2);
      setPosition({ x: newX, y: newY });
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [showMouseLight, position]);

  if (showMouseLight) {
    return (
      <div
        className="light"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      ></div>
    );
  } else {
    return null;
  }
}

export default MouseLightFollower;
