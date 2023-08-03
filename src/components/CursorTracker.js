import React, { useEffect, useState } from "react";

const CursorTracker = ({ cursorRef, onDrag }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursorPosition = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      onDrag();
    };

    document.addEventListener("mousemove", updateCursorPosition);

    return () => {
      document.removeEventListener("mousemove", updateCursorPosition);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="absolute rounded-full"
      style={{ left: cursorPosition.x, top: cursorPosition.y }}
    ></div>
  );
};

export default CursorTracker;
