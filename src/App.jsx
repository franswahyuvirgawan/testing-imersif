import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import next from "./videos/next.mp4";
import ganti from "./videos/ganti.mp4";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [playVideo, setPlayVideo] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [videoSource, setVideoSource] = useState("");
  const [videoKey, setVideoKey] = useState(0);
  const [isVolumeOn, setIsVolumeOn] = useState(false);

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

        if (transcript.toLowerCase().includes("next")) {
          setPlayVideo(true);
          setShowSuccess(true);
          setVideoSource(next);
          recognition.continuous = true; // Mendeteksi suara terus-menerus
          recognition.interimResults = true; // Menghasilkan hasil interim saat pengguna berbicara
        } else if (transcript.toLowerCase().includes("ganti")) {
          setPlayVideo(true);
          setShowSuccess(true);
          setVideoSource(ganti);
          recognition.continuous = true; // Mendeteksi suara terus-menerus
          recognition.interimResults = true; // Menghasilkan hasil interim saat pengguna berbicara
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

  const handleVolumeChange = () => {
    setIsVolumeOn(true);
  };

  return (
    <div className="bg-black w-full h-screen">
      <input
        type="text"
        hidden
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {playVideo && (
        <div>
          <video
            key={videoKey}
            width="100%"
            height="100vh"
            controls
            autoPlay
            muted={!isVolumeOn}
            onVolumeChange={handleVolumeChange}
          >
            <source src={videoSource} type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  );
}

export default App;
