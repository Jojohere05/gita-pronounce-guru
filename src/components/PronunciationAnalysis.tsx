import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

export interface AnalysisResult {
  overallScore: number;
  transcription: string;
  feedback: string[];
  wordAnalysis: {
    word: string;
    status: 'correct' | 'incorrect' | 'missing';
    feedback?: string;
  }[];
  suggestions: string[];
}

interface PronunciationAnalysisProps {
  result: AnalysisResult | null;
}

const PronunciationAnalysis = ({ result }: PronunciationAnalysisProps) => {
  if (!result) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'correct':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'incorrect':
        return <XCircle className="w-4 h-4 text-destructive" />;
      case 'missing':
        return <AlertCircle className="w-4 h-4 text-warning" />;
      default:
        return null;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'correct':
        return "default";
      case 'incorrect':
        return "destructive";
      case 'missing':
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card className="p-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Pronunciation Analysis</h3>
          <div className={`text-4xl font-bold ${getScoreColor(result.overallScore)}`}>
            {result.overallScore}%
          </div>
          <p className="text-muted-foreground mt-2">Overall Accuracy Score</p>
        </div>
      </Card>

      {/* Transcription */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-3">What We Heard</h4>
        <p className="text-foreground bg-muted p-4 rounded-lg italic">
          "{result.transcription}"
        </p>
      </Card>

      {/* Word Analysis */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-4">Word-by-Word Analysis</h4>
        <div className="space-y-3">
          {result.wordAnalysis.map((analysis, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(analysis.status)}
                <span className="font-medium">{analysis.word}</span>
                <Badge variant={getStatusVariant(analysis.status)}>
                  {analysis.status}
                </Badge>
              </div>
              {analysis.feedback && (
                <span className="text-sm text-muted-foreground max-w-xs text-right">
                  {analysis.feedback}
                </span>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Feedback */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-3">Detailed Feedback</h4>
        <ul className="space-y-2">
          {result.feedback.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <span className="text-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Suggestions */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-3">Improvement Suggestions</h4>
        <ul className="space-y-2">
          {result.suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0" />
              <span className="text-foreground">{suggestion}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default PronunciationAnalysis;