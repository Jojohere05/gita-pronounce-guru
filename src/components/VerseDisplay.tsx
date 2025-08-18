import { Card } from "@/components/ui/card";

interface VerseDisplayProps {
  sanskritText: string;
  transliteration: string;
  highlightedWords?: string[];
}

const VerseDisplay = ({ sanskritText, transliteration, highlightedWords = [] }: VerseDisplayProps) => {
  const renderHighlightedText = (text: string, wordsToHighlight: string[]) => {
    if (wordsToHighlight.length === 0) {
      return text;
    }

    let highlightedText = text;
    wordsToHighlight.forEach((word) => {
      const regex = new RegExp(`(${word})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark class="bg-warning text-warning-foreground px-1 rounded">$1</mark>');
    });

    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  return (
    <Card className="p-8 bg-accent border-0 shadow-lg">
      <div className="text-center space-y-4">
        <div className="text-2xl font-bold text-foreground leading-relaxed">
          {renderHighlightedText(sanskritText, highlightedWords)}
        </div>
        <div className="text-lg italic text-muted-foreground leading-relaxed">
          {renderHighlightedText(transliteration, highlightedWords)}
        </div>
      </div>
    </Card>
  );
};

export default VerseDisplay;