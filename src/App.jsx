import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import Lagu1 from "./videos/test.mp4";
import Lagu2 from "./videos/ganti.mp4";
import Lagu3 from "./videos/play.mp4";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [playVideo, setPlayVideo] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [videoSource, setVideoSource] = useState("");
  const [videoKey, setVideoKey] = useState(0);

  useEffect(() => {
    // Memeriksa apakah browser mendukung Speech Recognition API
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();

      recognition.continuous = true; // Mendeteksi suara terus-menerus
      recognition.interimResults = true; // Menghasilkan hasil interim saat pengguna berbicara

      recognition.onresult = (event) => {
        const transcript =
          event.results[event.results.length - 1][0].transcript;
        setInputValue(transcript.toLowerCase());

        if (transcript.toLowerCase().includes("halo")) {
          setPlayVideo(true);
          setShowSuccess(true);
          setVideoSource(Lagu1);
        } else if (transcript.toLowerCase().includes("hola")) {
          setVideoSource(Lagu2);
          setPlayVideo(true);
          setShowSuccess(true);
        } else if (transcript.toLowerCase().includes("hai")) {
          setVideoSource(Lagu3);
          setPlayVideo(true);
          setShowSuccess(true);
        }
      };

      setVideoKey((prevKey) => prevKey + 1);

      recognition.start(); // Memulai recognition

      return () => {
        recognition.stop(); // Menghentikan recognition saat komponen tidak lagi digunakan
      };
    } else {
      console.log("Speech Recognition tidak didukung di browser ini");
    }
  }, [inputValue]);

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {playVideo && (
        <div>
          <video
            key={videoKey}
            width="560"
            height="315"
            controls
            autoPlay
            muted
          >
            <source src={videoSource} type="video/mp4" />
          </video>
          {showSuccess && <p>Berhasil!</p>}
        </div>
      )}
    </div>
  );
}

export default App;
