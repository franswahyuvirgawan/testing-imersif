import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [tag, setTag] = useState("");

  useEffect(() => {
    if (inputValue.toLowerCase() === "mulai") {
      doAction();
    } else {
      resetState();
    }
  }, [inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const doAction = () => {
    console.log("Aksi dilakukan!");

    setShowSuccess(true);

    setTag("baru");
  };

  const resetState = () => {
    setShowSuccess(false);
    setTag("");
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      {showSuccess && (
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/91vECNhvmMY?start=0&autoplay=1"
          title="YouTube Video Player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}

export default App;
