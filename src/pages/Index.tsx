import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import VerseDisplay from '@/components/VerseDisplay';
import AudioControls from '@/components/AudioControls';
import PronunciationAnalysis, { AnalysisResult } from '@/components/PronunciationAnalysis';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { 
  CHAPTER_15_VERSE_1, 
  analyzePronunciation, 
  playReferenceAudio 
} from '@/utils/pronunciationAnalyzer';

const Index = () => {
  const [isPlayingReference, setIsPlayingReference] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();
  
  const {
    isRecording,
    hasRecording,
    isPlaying,
    audioBlob,
    startRecording,
    stopRecording,
    playRecording,
    resetRecording,
  } = useAudioRecorder();

  const handlePlayReference = async () => {
    try {
      setIsPlayingReference(true);
      await playReferenceAudio();
      toast({
        title: "Reference audio played",
        description: "Now try recording your pronunciation",
      });
    } catch (error) {
      toast({
        title: "Playback failed",
        description: "Could not play reference audio",
        variant: "destructive",
      });
    } finally {
      setIsPlayingReference(false);
    }
  };

  const handleAnalyzePronunciation = async () => {
    if (!audioBlob) {
      toast({
        title: "No recording found",
        description: "Please record your pronunciation first",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsAnalyzing(true);
      setAnalysisResult(null);
      
      const result = await analyzePronunciation(audioBlob);
      setAnalysisResult(result);
      
      const scoreMessage = result.overall_score >= 80 
        ? "Excellent pronunciation!" 
        : result.overall_score >= 60 
        ? "Good effort! Keep practicing." 
        : "Keep practicing to improve your pronunciation.";
      
      toast({
        title: "Analysis complete",
        description: scoreMessage,
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Could not analyze your pronunciation",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleTryAgain = () => {
    setAnalysisResult(null);
    resetRecording();
    toast({
      title: "Ready to try again",
      description: "Record your pronunciation when ready",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Bhagavad Gita Chapter 15 Pronunciation Helper
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Learn to pronounce Sanskrit verses correctly with AI-powered pronunciation analysis
          </p>
        </div>

        {/* Verse Display */}
        <VerseDisplay
          sanskrit={CHAPTER_15_VERSE_1.sanskrit}
          transliteration={CHAPTER_15_VERSE_1.transliteration}
          verseNumber={CHAPTER_15_VERSE_1.verseNumber}
        />

        {/* Audio Controls */}
        <AudioControls
          isRecording={isRecording}
          hasRecording={hasRecording}
          isPlaying={isPlaying}
          isPlayingReference={isPlayingReference}
          isAnalyzing={isAnalyzing}
          onPlayReference={handlePlayReference}
          onStartRecording={startRecording}
          onStopRecording={stopRecording}
          onPlayRecording={playRecording}
          onAnalyzePronunciation={handleAnalyzePronunciation}
        />

        {/* Recording Status */}
        {isRecording && (
          <div className="text-center mt-6">
            <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
              <span className="text-sm font-medium">Recording in progress...</span>
            </div>
          </div>
        )}

        {/* Analysis Results */}
        <PronunciationAnalysis
          analysisResult={analysisResult}
          onTryAgain={handleTryAgain}
        />

        {/* Instructions */}
        <div className="max-w-2xl mx-auto mt-12 p-6 bg-muted/50 rounded-xl">
          <h3 className="text-lg font-semibold mb-3">How to use:</h3>
          <ol className="space-y-2 text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-primary font-medium">1.</span>
              Click "Play Reference Audio" to hear the correct pronunciation
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-medium">2.</span>
              Click "Start Recording" and recite the verse clearly
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-medium">3.</span>
              Click "Stop Recording" when finished
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-medium">4.</span>
              Review your recording and click "Analyze Pronunciation"
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-medium">5.</span>
              Review the analysis and practice areas that need improvement
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Index;