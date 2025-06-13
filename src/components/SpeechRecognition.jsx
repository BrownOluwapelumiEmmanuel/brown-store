import React, { useEffect, useState, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import html2canvas from "html2canvas";
import { Mic, MicOff } from "lucide-react";

const SpeechRecognitionComponent = () => {
  const {
    transcript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (transcript.toLowerCase().includes("capture")) {
      captureScreen();
    }
  }, [transcript]);

  const showStatus = (message) => {
    setStatus(message);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setStatus(null), 2000);
  };

  const toggleListening = async () => {
    if (!browserSupportsSpeechRecognition) {
      showStatus("Speech recognition not supported");
      return;
    }

    if (!isMicrophoneAvailable) {
      showStatus("Microphone not available");
      return;
    }

    if (!isListening) {
      try {
        await SpeechRecognition.startListening({ continuous: true });
        setIsListening(true);
        showStatus("Listening");
      } catch (err) {
        showStatus("Failed to start microphone");
      }
    } else {
      SpeechRecognition.stopListening();
      setIsListening(false);
      showStatus("Stopped Listening");
    }
  };

  const captureScreen = async () => {
    try {
      const canvas = await html2canvas(document.body, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const link = document.createElement("a");
      link.download = `screenshot-${timestamp}.png`;
      link.href = canvas.toDataURL("image/png", 1.0);
      link.click();
      showStatus("Screenshot Captured");
    } catch (error) {
      console.error("Capture error:", error);
      showStatus("Failed to capture screenshot");
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="fixed bottom-4 right-4 bg-red-200 text-red-800 p-3 rounded-md z-50">
        Browser does not support voice recognition.
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-center gap-2">
      {status && (
        <div className="status-bubble" key={status}>
          {status}
        </div>
      )}

      {isListening && (
        <div className="status-bubble">
          Say <strong>"Capture"</strong> to take a screenshot
        </div>
      )}

      <button
        onClick={toggleListening}
        className={`p-4 rounded-full shadow-lg transition-transform ${
          isListening ? "bg-blue-400 animate-pulse" : "bg-blue-600"
        } hover:scale-110`}
        style={{ color: "white" }}
        aria-label={isListening ? "Stop Listening" : "Start Listening"}>
        {isListening ? <Mic /> : <MicOff />}
      </button>

      <style>{`
        .status-bubble {
          background: #bee3f8;
          color: #1e40af;
          padding: 6px 12px;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 500;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          white-space: nowrap;
          user-select: none;
          animation: fadeOut 2s forwards;
        }
        @keyframes fadeOut {
          0% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default SpeechRecognitionComponent;
