import { AnalysisResult } from '@/components/PronunciationAnalysis';

// Sanskrit verse data
export const CHAPTER_15_VERSE_1 = {
  sanskrit: `श्रीभगवानुवाच ।
ऊर्ध्वमूलमधःशाखमश्वत्थं प्राहुरव्ययम् ।
छन्दांसि यस्य पर्णानि यस्तं वेद स वेदवित् ॥१५.१॥`,
  transliteration: "Oordhva-moolam-adhah-shaakham-ashvattham praahuravyayam. Chhandaamsi yasya parnaani yas-tam veda sa veda-vit.",
  verseNumber: "श्रीमद्भगवद्गीता १५.१"
};

// Expected words for analysis
const EXPECTED_WORDS = [
  "ऊर्ध्वमूलम्",
  "अधःशाखम्", 
  "अश्वत्थं",
  "प्राहुर्",
  "अव्ययम्",
  "छन्दांसि",
  "यस्य",
  "पर्णानि",
  "यः",
  "तं",
  "वेद",
  "स",
  "वेदवित्"
];

// Mock analysis function - in real implementation, this would call a backend API
export const analyzePronunciation = async (audioBlob: Blob): Promise<AnalysisResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock analysis result - replace with actual API call
  const mockResult: AnalysisResult = {
    overall_score: Math.floor(Math.random() * 40) + 60, // 60-100% range
    word_analysis: EXPECTED_WORDS.map((word, index) => {
      const statuses = ['correct', 'incorrect', 'missing'] as const;
      const randomStatus = statuses[Math.floor(Math.random() * 3)];
      const confidence = Math.floor(Math.random() * 30) + 70; // 70-100% range
      
      let feedback = '';
      switch (randomStatus) {
        case 'correct':
          feedback = 'Well pronounced!';
          break;
        case 'incorrect':
          feedback = 'Try emphasizing the vowel sounds';
          break;
        case 'missing':
          feedback = 'This word was not detected in your recording';
          break;
      }
      
      return {
        word,
        status: randomStatus,
        confidence,
        feedback
      };
    }),
    suggestions: [
      'Focus on clear pronunciation of Sanskrit vowels (a, i, u)',
      'Try speaking slightly slower for better clarity',
      'Practice the "r" sounds in words like "ऊर्ध्वमूलम्"',
      'Pay attention to the conjunct consonants'
    ],
    transcription: "urdhva moolam adha shaakham ashvattham prahu avyayam..."
  };
  
  return mockResult;
};

// Mock reference audio URL - replace with actual audio file
export const getReferenceAudioUrl = (): string => {
  // In a real implementation, this would return the URL to the reference audio file
  return 'data:audio/wav;base64,'; // Placeholder
};

export const playReferenceAudio = async (): Promise<void> => {
  // Mock reference audio playback
  return new Promise((resolve) => {
    // Simulate audio playback duration
    setTimeout(resolve, 3000);
  });
};