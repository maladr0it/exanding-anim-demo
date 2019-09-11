import React, { useState, useEffect, useRef } from "react";

import { lorem } from "./lorem";
import { createKeyframes } from "./createKeyframes";
import { ReactComponent as DownSvg } from "./assets/angle-down-solid.svg";
import { ReactComponent as UpSvg } from "./assets/angle-up-solid.svg";

import "./App.css";

const App: React.FC = () => {
  const keyframesRef = useRef<Keyframe[] | null>(null);
  const inverseKeyframesRef = useRef<Keyframe[] | null>(null);
  const touchedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(prev => !prev);
  };

  useEffect(() => {
    if (containerRef.current && contentRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();
      const { keyframes, inverseKeyframes } = createKeyframes(
        containerRect,
        contentRect
      );
      keyframesRef.current = keyframes;
      inverseKeyframesRef.current = inverseKeyframes;
    }
  }, []);

  useEffect(() => {
    if (
      touchedRef.current &&
      containerRef.current &&
      contentRef.current &&
      keyframesRef.current &&
      inverseKeyframesRef.current
    ) {
      containerRef.current.animate(keyframesRef.current, {
        duration: 1000,
        fill: "forwards",
        direction: open ? "normal" : "reverse"
      });
      contentRef.current.animate(inverseKeyframesRef.current, {
        duration: 1000,
        fill: "forwards",
        direction: open ? "normal" : "reverse"
      });
    }

    touchedRef.current = true;
  }, [open]);

  return (
    <div className="App">
      <div ref={containerRef} className="Expander">
        <div ref={contentRef} className="Expander-content">
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
