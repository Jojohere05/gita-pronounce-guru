import { CheckCircle, XCircle, AlertCircle, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export interface AnalysisResult {
  overall_score: number;
  word_analysis: Array<{
    word: string;
    status: 'correct' | 'incorrect' | 'missing';
    confidence: number;
    feedback?: string;
  }>;
  suggestions: string[];
  transcription?: string;
}

interface PronunciationAnalysisProps {
  analysisResult: AnalysisResult | null;
  onTryAgain: () => void;
}

const PronunciationAnalysis = ({ analysisResult, onTryAgain }: PronunciationAnalysisProps) => {
  if (!analysisResult) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'correct':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'incorrect':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'missing':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  return (
    <Card className="max-w-4xl mx-auto p-6 shadow-large mt-8">
      <div className="space-y-6">
        {/* Overall Score */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-2">Pronunciation Analysis</h3>
          <div className={`text-4xl font-bold ${getScoreColor(analysisResult.overall_score)}`}>
            {analysisResult.overall_score}%
          </div>
          <p className="text-muted-foreground mt-1">Overall Accuracy</p>
        </div>

        {/* Word-by-word Analysis */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Word Analysis</h4>
          <div className="grid gap-3">
            {analysisResult.word_analysis.map((word, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border"
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(word.status)}
                  <span className="font-sanskrit text-lg">{word.word}</span>
                  <span className="text-sm text-muted-foreground">
                    ({word.confidence}% confidence)
                  </span>
                </div>
                {word.feedback && (
                  <span className="text-sm text-muted-foreground max-w-xs">
                    {word.feedback}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Transcription */}
        {analysisResult.transcription && (
          <div className="space-y-2">
            <h4 className="text-lg font-semibold">What we heard:</h4>
            <p className="text-muted-foreground italic p-3 bg-muted/50 rounded-lg">
              "{analysisResult.transcription}"
            </p>
          </div>
        )}

        {/* Suggestions */}
        {analysisResult.suggestions.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-lg font-semibold">Suggestions for Improvement</h4>
            <ul className="space-y-2">
              {analysisResult.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-primary mt-1">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center pt-4">
          <Button onClick={onTryAgain} className="bg-primary hover:bg-primary-hover">
            <Volume2 className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PronunciationAnalysis;