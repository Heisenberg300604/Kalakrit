import { useState } from "react";

interface Props {
  onText: (text: string) => void;
}

export default function VoiceToText({ onText }: Props) {
  const [listening, setListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.start();

    setListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onText(transcript);   // send voice text to parent
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  return (
    <button onClick={startListening}>
      {listening ? "Listening..." : "🎤"}
    </button>
  );
}