import { useState } from 'react';
import VerseDisplay from '@/components/VerseDisplay';
import AudioControls from '@/components/AudioControls';
import PronunciationAnalysis, { AnalysisResult } from '@/components/PronunciationAnalysis';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { analyzePronunciation } from '@/utils/pronunciationAnalyzer';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [highlightedWords, setHighlightedWords] = useState<string[]>([]);

  const {
    isRecording,
    hasRecording,
    isPlaying,
    startRecording,
    stopRecording,
    playRecording,
    playReferenceAudio,
    getRecordingBlob,
  } = useAudioRecorder();

  const sanskritText = "श्री भगवान उवाच ऊर्ध्वमूलम अधःशाखम अश्वत्थं प्राहुर अव्ययम्";
  const transliteration = "śrī bhagavān uvāca ūrdhva-mūlam adhaḥ-śākham aśvatthaṁ prāhur avyayam";

  const handleAnalyzePronunciation = async () => {
    const audioBlob = getRecordingBlob();
    if (!audioBlob) {
      toast({
        title: "No recording found",
        description: "Please record your pronunciation first",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const result = await analyzePronunciation(audioBlob);
      setAnalysisResult(result);
      
      // Highlight incorrect and missing words
      const wordsToHighlight = result.wordAnalysis
        .filter(analysis => analysis.status !== 'correct')
        .map(analysis => analysis.word);
      setHighlightedWords(wordsToHighlight);

      toast({
        title: "Analysis complete",
        description: `Your pronunciation scored ${result.overallScore}%`,
      });
    } catch (error) {
      console.error('Analysis failed:', error);
      toast({
        title: "Analysis failed",
        description: "Could not analyze pronunciation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-4xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Bhagavad Gita Chapter 15 Pronunciation Helper
          </h1>
          <p className="text-muted-foreground">
            Practice and perfect your Sanskrit pronunciation with AI feedback
          </p>
        </div>

        {/* Verse Display */}
        <VerseDisplay
          sanskritText={sanskritText}
          transliteration={transliteration}
          highlightedWords={highlightedWords}
        />

        {/* Audio Controls */}
        <AudioControls
          isRecording={isRecording}
          hasRecording={hasRecording}
          isPlaying={isPlaying}
          onPlayReference={playReferenceAudio}
          onStartRecording={startRecording}
          onStopRecording={stopRecording}
          onPlayRecording={playRecording}
          onAnalyzePronunciation={handleAnalyzePronunciation}
          isAnalyzing={isAnalyzing}
        />

        {/* Analysis Results */}
        {analysisResult && (
          <PronunciationAnalysis result={analysisResult} />
        )}
      </div>
    </div>
  );
};

export default Index;
