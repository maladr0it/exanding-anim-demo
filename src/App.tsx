import React, { useState } from "react";

import { lorem } from "./lorem";
import { ReactComponent as DownSvg } from "./assets/angle-down-solid.svg";
import { ReactComponent as UpSvg } from "./assets/angle-up-solid.svg";

import "./App.css";

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(prev => !prev);
  };

  return (
    <div className="App">
      <div className="Expander">
        <div className="Expander-content">
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
