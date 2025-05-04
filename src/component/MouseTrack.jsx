import React from "react";
import useMousePosition from "../hook/useMouseTrack";

const MouseTracker = () => {
  const { x, y } = useMousePosition();

  return (
    <div className="h-screen bg-gray-900 flex items-center justify-center text-white relative">
      <h1 className="text-2xl">Mouse Position: X: {x}, Y: {y}</h1>


      <div
        className="absolute w-5 h-5 bg-blue-500 rounded-full pointer-events-none"
        style={{
          transform: `translate(${x}px, ${y}px)`,
          transition: "transform 0.1s linear",
        }}
      />
    </div>
  );
};

export default MouseTracker;

