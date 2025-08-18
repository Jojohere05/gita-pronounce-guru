interface VerseDisplayProps {
  sanskrit: string;
  transliteration: string;
  verseNumber: string;
}

const VerseDisplay = ({ sanskrit, transliteration, verseNumber }: VerseDisplayProps) => {
  return (
    <div className="verse-container rounded-xl p-8 shadow-soft mb-8 max-w-4xl mx-auto">
      <div className="text-center">
        <div className="text-lg font-medium text-foreground mb-4">
          {verseNumber}
        </div>
        
        {/* Sanskrit verse in Devanagari */}
        <div className="font-sanskrit text-2xl md:text-3xl leading-relaxed text-foreground mb-6">
          {sanskrit.split('\n').map((line, index) => (
            <div key={index} className="mb-2">
              {line}
            </div>
          ))}
        </div>
        
        {/* Roman transliteration */}
        <div className="italic text-sm md:text-base text-muted-foreground leading-relaxed">
          (Roman Transliteration: {transliteration})
        </div>
      </div>
    </div>
  );
};

export default VerseDisplay;