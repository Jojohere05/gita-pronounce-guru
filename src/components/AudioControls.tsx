import { Button } from "@/components/ui/button";
import { Play, Square, Mic, Volume2, Loader2 } from "lucide-react";

interface AudioControlsProps {
  isRecording: boolean;
  hasRecording: boolean;
  isPlaying: boolean;
  isPlayingReference: boolean;
  isAnalyzing: boolean;
  onPlayReference: () => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onPlayRecording: () => void;
  onAnalyzePronunciation: () => void;
}

const AudioControls = ({
  isRecording,
  hasRecording,
  isPlaying,
  isPlayingReference,
  isAnalyzing,
  onPlayReference,
  onStartRecording,
  onStopRecording,
  onPlayRecording,
  onAnalyzePronunciation,
}: AudioControlsProps) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Main control buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button
          onClick={onPlayReference}
          disabled={isPlayingReference || isRecording}
          className="h-12 text-sm font-medium bg-primary hover:bg-primary-hover text-primary-foreground shadow-medium"
        >
          {isPlayingReference ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Volume2 className="w-4 h-4 mr-2" />
          )}
          Play Reference Audio
        </Button>

        <Button
          onClick={onStartRecording}
          disabled={isRecording || isPlaying}
          className="h-12 text-sm font-medium bg-primary hover:bg-primary-hover text-primary-foreground shadow-medium"
        >
          <Mic className="w-4 h-4 mr-2" />
          Start Recording
        </Button>

        <Button
          onClick={onStopRecording}
          disabled={!isRecording}
          variant={isRecording ? "default" : "secondary"}
          className={`h-12 text-sm font-medium shadow-medium ${
            isRecording 
              ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground" 
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          <Square className="w-4 h-4 mr-2" />
          Stop Recording
        </Button>

        <Button
          onClick={onPlayRecording}
          disabled={!hasRecording || isPlaying || isRecording}
          variant={hasRecording && !isPlaying && !isRecording ? "default" : "secondary"}
          className={`h-12 text-sm font-medium shadow-medium ${
            hasRecording && !isPlaying && !isRecording
              ? "bg-primary hover:bg-primary-hover text-primary-foreground"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {isPlaying ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Play className="w-4 h-4 mr-2" />
          )}
          Play My Recording
        </Button>
      </div>

      {/* Analyze button */}
      <div className="flex justify-center">
        <Button
          onClick={onAnalyzePronunciation}
          disabled={!hasRecording || isRecording || isAnalyzing}
          className={`h-14 px-8 text-base font-semibold shadow-large ${
            hasRecording && !isRecording && !isAnalyzing
              ? "bg-primary hover:bg-primary-hover text-primary-foreground"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {isAnalyzing ? (
            <Loader2 className="w-5 h-5 mr-3 animate-spin" />
          ) : (
            <div className="w-5 h-5 mr-3 bg-current rounded-full opacity-80" />
          )}
          Analyze Pronunciation
        </Button>
      </div>
    </div>
  );
};

export default AudioControls;