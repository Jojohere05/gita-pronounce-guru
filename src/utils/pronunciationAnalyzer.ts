import { AnalysisResult } from '@/components/PronunciationAnalysis';

// Mock pronunciation analysis - replace with actual AI model integration
export const analyzePronunciation = async (audioBlob: Blob): Promise<AnalysisResult> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Mock analysis result
  const mockResults: AnalysisResult[] = [
    {
      overallScore: 85,
      transcription: "श्री भगवान उवाच ऊर्ध्वमूलम अधःशाखम अश्वत्थं प्राहुर अव्ययम्",
      feedback: [
        "Excellent pronunciation of 'श्री भगवान उवाच'",
        "Good effort with 'ऊर्ध्वमूलम', but the 'ध्व' sound needs work",
        "The word 'अश्वत्थं' was pronounced correctly",
        "Overall rhythm and pace were appropriate"
      ],
      wordAnalysis: [
        { word: "श्री", status: "correct" },
        { word: "भगवान", status: "correct" },
        { word: "उवाच", status: "correct" },
        { word: "ऊर्ध्वमूलम", status: "incorrect", feedback: "The 'ध्व' sound needs more practice" },
        { word: "अधःशाखम", status: "correct" },
        { word: "अश्वत्थं", status: "correct" },
        { word: "प्राहुर", status: "incorrect", feedback: "The 'प्र' should be more aspirated" },
        { word: "अव्ययम्", status: "correct" }
      ],
      suggestions: [
        "Practice the 'ध्व' sound in 'ऊर्ध्वमूलम' by focusing on the tongue position",
        "Work on aspirated consonants like 'प्र' in 'प्राहुर'",
        "Try reciting slowly first, then gradually increase pace",
        "Record yourself daily to track improvement"
      ]
    },
    {
      overallScore: 72,
      transcription: "श्री भगवान उवाच ऊर्ध्वमूलम अधःशाखम अश्वत्थं प्राहुर",
      feedback: [
        "Good start with 'श्री भगवान उवाच'",
        "The word 'ऊर्ध्वमूलम' needs clearer pronunciation",
        "Missing the final word 'अव्ययम्'",
        "Overall understanding of Sanskrit sounds is developing well"
      ],
      wordAnalysis: [
        { word: "श्री", status: "correct" },
        { word: "भगवान", status: "correct" },
        { word: "उवाच", status: "correct" },
        { word: "ऊर्ध्वमूलम", status: "incorrect", feedback: "Unclear pronunciation of conjunct consonants" },
        { word: "अधःशाखम", status: "correct" },
        { word: "अश्वत्थं", status: "correct" },
        { word: "प्राहुर", status: "incorrect", feedback: "Pronunciation unclear" },
        { word: "अव्ययम्", status: "missing", feedback: "This word was not spoken" }
      ],
      suggestions: [
        "Practice conjunct consonants like 'ध्व' and 'श्व'",
        "Make sure to complete the entire verse",
        "Focus on clear articulation of each syllable",
        "Listen to the reference audio multiple times before attempting"
      ]
    },
    {
      overallScore: 93,
      transcription: "श्री भगवान उवाच ऊर्ध्वमूलम अधःशाखम अश्वत्थं प्राहुर अव्ययम्",
      feedback: [
        "Excellent pronunciation overall!",
        "Perfect articulation of conjunct consonants",
        "Proper rhythm and intonation maintained",
        "All words pronounced clearly and correctly"
      ],
      wordAnalysis: [
        { word: "श्री", status: "correct" },
        { word: "भगवान", status: "correct" },
        { word: "उवाच", status: "correct" },
        { word: "ऊर्ध्वमूलम", status: "correct" },
        { word: "अधःशाखम", status: "correct" },
        { word: "अश्वत्थं", status: "correct" },
        { word: "प्राहुर", status: "correct" },
        { word: "अव्ययम्", status: "correct" }
      ],
      suggestions: [
        "Your pronunciation is excellent! Keep practicing regularly",
        "Try other verses from Chapter 15 to expand your skills",
        "Focus on maintaining this level of clarity in longer passages",
        "Consider learning the meaning alongside pronunciation"
      ]
    }
  ];

  // Return a random mock result
  return mockResults[Math.floor(Math.random() * mockResults.length)];
};