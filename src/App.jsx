import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import Test from "./videos/test.mp4";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [playVideo, setPlayVideo] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setInputValue("");
    }, 1000);

    if (inputValue.toLowerCase() === "mulai") {
      setPlayVideo(true);
      setShowSuccess(true);
      setInputValue("");
    } else {
      setShowSuccess(false);
    }

    return () => clearTimeout(timeout);
  }, [inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      {playVideo && (
        <div>
          <video width="560" height="315" controls autoPlay>
            <source src={Test} type="video/mp4" />
          </video>
          {showSuccess && <p>Berhasil!</p>}
        </div>
      )}
    </div>
  );
}

export default App;
