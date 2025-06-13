import React, { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import html2canvas from "html2canvas";
import { toast } from "react-hot-toast";
import { Mic, MicOff } from "lucide-react";

const SpeechRecognitionComponent = () => {
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  
  useEffect(() => {
    if (transcript.toLowerCase().includes("capture")) {
      captureScreen();
    }
  }, [transcript]);

  // Toggle mic on/off with better error handling
  const toggleListening = () => {
    console.log("Mic toggle clicked");
    console.log("Browser supports speech:", browserSupportsSpeechRecognition);
    console.log("Mic available:", isMicrophoneAvailable);

    if (!browserSupportsSpeechRecognition) {
      toast.error("Speech recognition not supported on this browser.");
      return;
    }

    if (!isMicrophoneAvailable) {
      toast.error(
        "Microphone is not available. Please enable it in browser settings."
      );
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
      toast("Stopped listening");
      console.log("Stopped listening");
    } else {
      SpeechRecognition.startListening({ continuous: true })
        .then(() => {
          toast.success("Listening started... Say 'Capture'");
          console.log("Started listening...");
        })
        .catch((err) => {
          console.error("Mic error:", err);
          toast.error(
            "Unable to start microphone. Please check browser permissions."
          );
        });
    }
  };

  // Capture screen and download
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

      toast.success("Screenshot captured successfully!");
    } catch (error) {
      console.error("Capture error:", error);
      toast.error("Failed to capture screenshot");
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
      {listening && (
        <div
          style={{
            background: "#bee3f8",
            color: "#1e40af",
            padding: "6px 12px",
            borderRadius: "12px",
            fontSize: "0.875rem",
            fontWeight: "500",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            whiteSpace: "nowrap",
            userSelect: "none",
          }}>
          Say <strong>"Capture"</strong> to take a screenshot
        </div>
      )}

      <button
        onClick={toggleListening}
        className={`p-4 rounded-full shadow-lg transition-transform ${
          listening ? "bg-blue-400 animate-pulse" : "bg-blue-600"
        } hover:scale-110`}
        style={{
          color: "white",
          transition: "background 0.3s ease",
        }}
        aria-label={listening ? "Stop Listening" : "Start Listening"}>
        {listening ? <Mic /> : <MicOff />}
      </button>
    </div>
  );
};

export default SpeechRecognitionComponent;
