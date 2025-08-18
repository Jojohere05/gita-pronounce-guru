import { Button } from "@/components/ui/button";
import { Play, Square, Mic, Volume2 } from "lucide-react";

interface AudioControlsProps {
  isRecording: boolean;
  hasRecording: boolean;
  isPlaying: boolean;
  onPlayReference: () => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onPlayRecording: () => void;
  onAnalyzePronunciation: () => void;
  isAnalyzing: boolean;
}

const AudioControls = ({
  isRecording,
  hasRecording,
  isPlaying,
  onPlayReference,
  onStartRecording,
  onStopRecording,
  onPlayRecording,
  onAnalyzePronunciation,
  isAnalyzing,
}: AudioControlsProps) => {
  return (
    <div className="space-y-6">
      {/* Main Control Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button
          onClick={onPlayReference}
          className="h-12 font-medium"
          disabled={isRecording || isPlaying}
        >
          <Volume2 className="w-4 h-4 mr-2" />
          Play Reference Audio
        </Button>

        <Button
          onClick={onStartRecording}
          className="h-12 font-medium"
          disabled={isRecording || isPlaying}
        >
          <Mic className="w-4 h-4 mr-2" />
          Start Recording
        </Button>

        <Button
          onClick={onStopRecording}
          variant="destructive"
          className="h-12 font-medium"
          disabled={!isRecording}
        >
          <Square className="w-4 h-4 mr-2" />
          Stop Recording
        </Button>

        <Button
          onClick={onPlayRecording}
          className="h-12 font-medium"
          disabled={!hasRecording || isRecording || isPlaying}
        >
          <Play className="w-4 h-4 mr-2" />
          Play My Recording
        </Button>
      </div>

      {/* Analyze Button */}
      <div className="flex justify-center">
        <Button
          onClick={onAnalyzePronunciation}
          size="lg"
          className="h-14 px-8 text-lg font-semibold"
          disabled={!hasRecording || isRecording || isAnalyzing}
        >
          {isAnalyzing ? "Analyzing..." : "Analyze Pronunciation"}
        </Button>
      </div>
    </div>
  );
};

export default AudioControls;