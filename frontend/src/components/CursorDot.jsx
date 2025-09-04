import React, { useEffect, useState } from "react";

const CursorTrail = () => {
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const move = (e) => {
      setTrail((prevTrail) => [
        { x: e.clientX, y: e.clientY, id: `${Date.now()}-${Math.random()}` },
        ...prevTrail.slice(0, 15),
      ]);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Bounce & high-energy colors
  const trailColors = ["#ec4899", "#8b5cf6", "#22d3ee", "#f59e0b"];

  return (
    <>
      {trail.map((point, index) => (
        <div
          key={point.id}
          style={{
            position: "fixed",
            top: point.y + Math.sin(index * 2) * 5,
            left: point.x + Math.cos(index * 2) * 5,
            width: `${8 - index * 0.5}px`,
            height: `${8 - index * 0.5}px`,
            backgroundColor: trailColors[index % trailColors.length],
            borderRadius: "50%",
            pointerEvents: "none",
            transform: `translate(-50%, -50%) scale(${1 + Math.sin(index * 2) * 0.1})`,
            opacity: 0.9 - index * 0.07,
            zIndex: 9999,
            boxShadow: `0 0 10px ${trailColors[index % trailColors.length]}`,
            transition: "all 0.1s ease",
          }}
        />
      ))}
    </>
  );
};

export default CursorTrail;
