"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function ConfettiBurst() {
  const [dimensions, setDimensions] = useState(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsDone(true);
      return;
    }

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
      colors={["#ff7a1a", "#ffb454", "#ffd8a8", "#4c9aff", "#f4f6fa"]}
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
