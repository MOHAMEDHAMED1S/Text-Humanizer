
/**
 * Utility functions for text analysis to determine how "human" a text is
 */

// Calculate Flesch-Kincaid reading ease score
export function calculateFleschReadingEase(text: string): number {
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
  const syllables = countSyllables(words.join(' '));
  
  if (words.length === 0 || sentences.length === 0) return 100;
  
  const wordsPerSentence = words.length / sentences.length;
  const syllablesPerWord = syllables / words.length;
  
  // Flesch Reading Ease formula
  return 206.835 - (1.015 * wordsPerSentence) - (84.6 * syllablesPerWord);
}

// Count syllables in text (English approximation)
function countSyllables(text: string): number {
  const cleanText = text.toLowerCase().replace(/[.,?!;:()\-\n\r]/g, ' ');
  const words = cleanText.split(' ').filter(word => word.length > 0);
  
  let count = 0;
  for (const word of words) {
    count += countSyllablesInWord(word);
  }
  
  return count;
}

// Count syllables in a word (English approximation)
function countSyllablesInWord(word: string): number {
  // Edge case
  if (word.length <= 3) return 1;
  
  // Remove ending "e", "es", "ed" but not "le"
  word = word.replace(/(?:[^l]e|es|ed)$/, '');
  
  // Count vowel groups
  const matches = word.match(/[aeiouy]+/g);
  return matches ? matches.length : 1;
}

// Calculate word diversity (unique words / total words)
export function calculateWordDiversity(text: string): number {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  if (words.length === 0) return 0;
  
  const uniqueWords = new Set(words);
  return uniqueWords.size / words.length;
}

// Calculate average sentence length
export function calculateAvgSentenceLength(text: string): number {
  const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
  if (sentences.length === 0) return 0;
  
  let totalLength = 0;
  for (const sentence of sentences) {
    const words = sentence.trim().split(/\s+/).filter(word => word.length > 0);
    totalLength += words.length;
  }
  
  return totalLength / sentences.length;
}

// Calculate sentence variety (standard deviation of sentence lengths)
export function calculateSentenceVariety(text: string): number {
  const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
  if (sentences.length <= 1) return 0;
  
  const lengths = sentences.map(sentence => 
    sentence.trim().split(/\s+/).filter(word => word.length > 0).length
  );
  
  const mean = lengths.reduce((sum, len) => sum + len, 0) / lengths.length;
  const squaredDiffs = lengths.map(len => Math.pow(len - mean, 2));
  const variance = squaredDiffs.reduce((sum, diff) => sum + diff, 0) / lengths.length;
  
  return Math.sqrt(variance);
}

// Calculate repeated phrase ratio
export function calculateRepeatedPhraseRatio(text: string): number {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  if (words.length < 4) return 0;
  
  const phrases = new Map<string, number>();
  
  // Generate 2, 3, and 4-word phrases and count them
  for (let i = 0; i < words.length - 1; i++) {
    // 2-word phrases
    if (i < words.length - 1) {
      const phrase2 = `${words[i]} ${words[i + 1]}`;
      phrases.set(phrase2, (phrases.get(phrase2) || 0) + 1);
    }
    
    // 3-word phrases
    if (i < words.length - 2) {
      const phrase3 = `${words[i]} ${words[i + 1]} ${words[i + 2]}`;
      phrases.set(phrase3, (phrases.get(phrase3) || 0) + 1);
    }
    
    // 4-word phrases
    if (i < words.length - 3) {
      const phrase4 = `${words[i]} ${words[i + 1]} ${words[i + 2]} ${words[i + 3]}`;
      phrases.set(phrase4, (phrases.get(phrase4) || 0) + 1);
    }
  }
  
  // Count repeated phrases (occurring more than once)
  let repeatedPhrases = 0;
  for (const count of phrases.values()) {
    if (count > 1) repeatedPhrases++;
  }
  
  // Get a ratio of repeated phrases to total possible phrases
  const totalPossiblePhrases = phrases.size;
  return totalPossiblePhrases > 0 ? repeatedPhrases / totalPossiblePhrases : 0;
}

// Calculate "humanization score" from 0-100
export function calculateHumanizationScore(text: string): number {
  // Empty text check
  if (!text || text.trim().length === 0) return 0;
  
  // Calculate individual metrics
  const readabilityScore = calculateFleschReadingEase(text);
  const wordDiversity = calculateWordDiversity(text);
  const avgSentenceLength = calculateAvgSentenceLength(text);
  const sentenceVariety = calculateSentenceVariety(text);
  const repeatedPhraseRatio = calculateRepeatedPhraseRatio(text);
  
  // Normalize metrics to 0-100 scales
  const normalizedReadability = Math.min(100, Math.max(0, readabilityScore));
  const normalizedWordDiversity = wordDiversity * 100; // 0-1 to 0-100
  
  // Ideal average sentence length is around 15-20 words
  const sentLengthScore = 100 - Math.abs(avgSentenceLength - 17.5) * 3;
  const normalizedSentLength = Math.min(100, Math.max(0, sentLengthScore));
  
  // Sentence variety - higher is better (up to a point)
  const normalizedSentVariety = Math.min(100, sentenceVariety * 20);
  
  // Repeated phrase ratio - lower is better
  const phraseScore = 100 - (repeatedPhraseRatio * 200);
  const normalizedPhraseScore = Math.min(100, Math.max(0, phraseScore));
  
  // Weight the different factors
  const weights = {
    readability: 0.25,
    wordDiversity: 0.25,
    sentenceLength: 0.15,
    sentenceVariety: 0.20,
    phraseRepetition: 0.15
  };
  
  // Calculate final score
  const score = 
    (normalizedReadability * weights.readability) +
    (normalizedWordDiversity * weights.wordDiversity) +
    (normalizedSentLength * weights.sentenceLength) +
    (normalizedSentVariety * weights.sentenceVariety) +
    (normalizedPhraseScore * weights.phraseRepetition);
  
  return Math.round(score);
}

// Mock function for text humanization (in real app, would call Gemini API)
export function humanizeText(text: string): string {
  // Mock function - in a real app, this would call the Gemini API
  // This is a placeholder that just slightly modifies the text
  
  // In a real implementation, this would call an AI service
  const beforeScore = calculateHumanizationScore(text);
  
  // Simple modifications to demonstrate functionality
  let result = text
    // Break up long sentences
    .replace(/(.{60,}?)[,;]/g, '$1.\n')
    // Add more varied sentence starters
    .replace(/The /g, 'This ')
    .replace(/This is/g, 'It is')
    // Add contractions to make it more conversational
    .replace(/it is/g, "it's")
    .replace(/that is/g, "that's")
    // Add some filler words occasionally
    .replace(/\. /g, '. Actually, ')
    // Replace some words with synonyms
    .replace(/good/g, 'great')
    .replace(/bad/g, 'terrible');
    
  // Ensure the "humanized" text has a better score
  const afterScore = calculateHumanizationScore(result);
  if (afterScore <= beforeScore) {
    // If our naive approach didn't improve the score, make more dramatic changes
    result = result
      .replace(/\b(\w+)ing\b/g, 'really $1ing')
      .replace(/\./g, '...')
      .replace(/!/g, '!!')
      .replace(/\?/g, '??');
  }
  
  return result;
}

export function getHumanizationLevel(score: number): 'low' | 'medium' | 'high' {
  if (score < 50) return 'low';
  if (score < 75) return 'medium';
  return 'high';
}
