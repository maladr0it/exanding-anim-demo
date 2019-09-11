import React, { useState, useEffect, useRef } from "react";

import { lorem } from "./lorem";
import { ReactComponent as DownSvg } from "./assets/angle-down-solid.svg";
import { ReactComponent as UpSvg } from "./assets/angle-up-solid.svg";

import "./App.css";

const App: React.FC = () => {
  const touchedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const keyframesRef = useRef<Keyframe[] | null>(null);

  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(prev => !prev);
  };

  useEffect(() => {
    if (containerRef.current && contentRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();

      const scaleX = contentRect.width / containerRect.width;
      const scaleY = contentRect.height / containerRect.height;

      keyframesRef.current = [
        { transform: `scale(1,1)` },
        { transform: `scale(${scaleX}, ${scaleY})` }
      ];
    }
  }, []);

  useEffect(() => {
    if (touchedRef.current && containerRef.current && keyframesRef.current) {
      containerRef.current.animate(keyframesRef.current, {
        duration: 1000,
        fill: "forwards",
        direction: open ? "normal" : "reverse"
      });
    }
    touchedRef.current = true;
  }, [open]);

  return (
    <div className="App">
      <div className="Expander" ref={containerRef}>
        <div className="Expander-content" ref={contentRef}>
          <button className="Expander-toggleButton" onClick={handleToggle}>
            {open ? <UpSvg /> : <DownSvg />}
          </button>
          <p className="Expander-text">{lorem}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
