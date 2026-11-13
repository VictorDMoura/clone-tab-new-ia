"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function ConfettiBurst() {
  const [dimensions, setDimensions] = useState(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    function updateDimensions() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  if (!dimensions || isDone) {
    return null;
  }

  return (
    <Confetti
      width={dimensions.width}
      height={dimensions.height}
      recycle={false}
      numberOfPieces={250}
      onConfettiComplete={() => setIsDone(true)}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 50,
      }}
    />
  );
}
