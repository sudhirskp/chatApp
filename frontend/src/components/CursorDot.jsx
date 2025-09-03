// // CursorTrail.jsx
// import React, { useEffect, useState } from "react";

// const CursorTrail = () => {
//   const [trail, setTrail] = useState([]);

//   useEffect(() => {
//     const move = (e) => {
//       setTrail((prevTrail) => [
//         { x: e.clientX, y: e.clientY, id: Date.now() },
//         ...prevTrail.slice(0, 9), // Limit the number of trail dots
//       ]);
//     };
//     window.addEventListener("mousemove", move);
//     return () => window.removeEventListener("mousemove", move);
//   }, []);

//   const trailColor = "#A855F7"; // Tailwind purple-500 (good for dark backgrounds)

//   return (
//     <>
//       {trail.map((point, index) => (
//         <div
//           key={point.id}
//           style={{
//             position: "fixed",
//             top: point.y,
//             left: point.x,
//             width: `${12 - index}px`,
//             height: `${12 - index}px`,
//             backgroundColor: trailColor,
//             borderRadius: "9999px",
//             pointerEvents: "none",
//             transform: "translate(-50%, -50%)",
//             opacity: 1 - index * 0.1,
//             zIndex: 9999,
//             mixBlendMode: "screen",
//             transition: "all 0.1s ease-out",
//           }}
//         />
//       ))}
//     </>
//   );
// };

// export default CursorTrail;





//--------------------------------



// // CursorTrail.jsx
// import React, { useEffect, useState } from "react";

// const CursorTrail = () => {
//   const [trail, setTrail] = useState([]);

//   useEffect(() => {
//     const move = (e) => {
//       setTrail((prevTrail) => [
//         { x: e.clientX, y: e.clientY, id: Date.now() },
//         ...prevTrail.slice(0, 9), // Limit the number of trail dots
//       ]);
//     };
//     window.addEventListener("mousemove", move);
//     return () => window.removeEventListener("mousemove", move);
//   }, []);

//   const trailColors = ["#0ea5e9", "#6366f1", "#ec4899"]; // cyan-500, indigo-500, pink-500

//   return (
//     <>
//       {trail.map((point, index) => (
//         <div
//           key={point.id}
//           style={{
//             position: "fixed",
//             top: point.y,
//             left: point.x,
//             width: `${12 - index}px`,
//             height: `${12 - index}px`,
//             backgroundColor: trailColors[index % trailColors.length],
//             borderRadius: "9999px",
//             pointerEvents: "none",
//             transform: "translate(-50%, -50%)",
//             opacity: 1 - index * 0.1,
//             zIndex: 9999,
//             mixBlendMode: "screen",
//             transition: "all 0.1s ease-out",
//           }}
//         />
//       ))}
//     </>
//   );
// };

// export default CursorTrail;


//---------------------------------------------------


// CursorTrail.jsx
// import React, { useEffect, useState } from "react";

// const CursorTrail = () => {
//   const [trail, setTrail] = useState([]);

//   useEffect(() => {
//     const move = (e) => {
//       setTrail((prevTrail) => [
//         { x: e.clientX, y: e.clientY, id: Date.now() },
//         ...prevTrail.slice(0, 12),
//       ]);
//     };
//     window.addEventListener("mousemove", move);
//     return () => window.removeEventListener("mousemove", move); it is convert that canniot  be for bidde
//   }, []);

//   // Matched to your theme (deep purple, violet, white glow)
//   const trailColors = ["#a855f7", "#7c3aed", "#9333ea", "#ffffff"];

//   return (
//     <>
//       {trail.map((point, index) => (
//         <div
//           key={point.id}
//           style={{
//             position: "fixed",
//             top: point.y + Math.sin(index) * 4,
//             left: point.x + Math.cos(index) * 4,
//             width: `${10 - index * 0.5}px`,
//             height: `${10 - index * 0.5}px`,
//             backgroundColor: trailColors[index % trailColors.length],
//             borderRadius: "50%",
//             pointerEvents: "none",
//             transform: "translate(-50%, -50%) scale(1.1)" maintain the link betw
//             opacity: 0.8 - index * 0.08,
//             zIndex: 9999,
//             boxShadow: `0 0 8px ${trailColors[index % trailColors.length]}`,
//             transition: "all 0.12s ease-out",
//           }}
//         />
//       ))}
//     </>
//   );
// };

// export default CursorTrail;


//-----------------------------------------------------------



// CursorTrail.jsx
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
