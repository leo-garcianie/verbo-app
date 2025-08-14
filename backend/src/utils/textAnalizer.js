import {
  countTotalSyllables,
  getParagraphs,
  getReadingLevel,
  getSentences,
  getWords,
} from "./helpers.js";

function analyzeText(text) {
  return {
    basic: getBasicStats(text),
    readability: getReadabilityStats(text),
    words: getWordAnalysis(text),
    characters: getCharacterAnalysis(text),
    sentences: getSentenceAnalysis(text),
  };
}

function getBasicStats(text) {
  const words = getWords(text);
  const sentences = getSentences(text);
  const paragraphs = getParagraphs(text);

  return {
    characterCount: text.length,
    characterCountNoSpaces: text.replace(/\s/g, "").length,
    wordCount: words.length,
    sentenceCount: sentences.length,
    paragraphCount: paragraphs.length,
    averageWordsPerSentence:
      sentences.length > 0
        ? Math.round((words.length / sentences.length) * 100) / 100
        : 0,
    averageSentencesPerParagraph:
      paragraphs.length > 0
        ? Math.round((sentences.length / paragraphs.length) * 100) / 100
        : 0,
  };
}

function getReadabilityStats(text) {
  const words = getWords(text);
  const sentences = getSentences(text);
  const syllables = countTotalSyllables(words);

  // Flesch Reading Ease Score (Flesch algorithm)
  let fleschScore = 0;
  if (sentences.length > 0 && words.length > 0) {
    fleschScore =
      206.835 -
      1.015 * (words.length / sentences.length) -
      84.6 * (syllables / words.length);
    fleschScore = Math.round(fleschScore * 100) / 100;
  }

  const readingLevel = getReadingLevel(fleschScore);
  const estimatedReadingTime = Math.ceil(words.length / 200); // The avg is 200 words per minute

  return {
    fleschScore,
    readingLevel,
    estimatedReadingTimeMinutes: estimatedReadingTime,
    averageSyllablesPerWord:
      words.length > 0 ? Math.round((syllables / words.length) * 100) / 100 : 0,
    totalSyllables: syllables,
  };
}

function getWordAnalysis(text) {
  const words = getWords(text);
  const wordFrequency = {};
  const wordLengths = [];

  words.forEach((word) => {
    const cleanWord = word.toLowerCase();
    wordFrequency[cleanWord] = (wordFrequency[cleanWord] || 0) + 1;
    wordLengths.push(word.length);
  });

  // Get the 5 most common words
  const sortedWords = Object.entries(wordFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([word, count]) => ({ word, count }));

  const averageWordLength =
    wordLengths.length > 0
      ? Math.round(
          (wordLengths.reduce((a, b) => a + b, 0) / wordLengths.length) * 100,
        ) / 100
      : 0;

  const longestWord = words.reduce(
    (longest, current) => (current.length > longest.length ? current : longest),
    "",
  );

  return {
    uniqueWords: Object.keys(wordFrequency).length,
    mostCommonWords: sortedWords,
    averageWordLength,
    longestWord,
    shortestWord: words.reduce(
      (shortest, current) =>
        current.length < shortest.length ? current : shortest,
      words[0] || "",
    ),
  };
}

function getCharacterAnalysis(text) {
  const letters = text.match(/[a-zA-Z]/g) || [];
  const numbers = text.match(/[0-9]/g) || [];
  const punctuation = text.match(/[.,;:!?'"()-]/g) || [];
  const spaces = text.match(/\s/g) || [];
  const special = text.match(/[^a-zA-Z0-9\s.,;:!?'"()-]/g) || [];

  return {
    letters: letters.length,
    numbers: numbers.length,
    spaces: spaces.length,
    punctuation: punctuation.length,
    specialCharacters: special.length,
    uppercaseLetters: (text.match(/[A-Z]/g) || []).length,
    lowercaseLetters: (text.match(/[a-z]/g) || []).length,
  };
}

function getSentenceAnalysis(text) {
  const sentences = getSentences(text);
  const sentenceLengths = sentences.map((s) => getWords(s).length);

  const averageLength =
    sentenceLengths.length > 0
      ? Math.round(
          (sentenceLengths.reduce((a, b) => a + b, 0) /
            sentenceLengths.length) *
            100,
        ) / 100
      : 0;

  const longestSentence = sentences.reduce(
    (longest, current) =>
      getWords(current).length > getWords(longest).length ? current : longest,
    "",
  );

  const shortestSentence = sentences.reduce(
    (shortest, current) =>
      getWords(current).length < getWords(shortest).length ? current : shortest,
    sentences[0] || "",
  );

  return {
    averageSentenceLength: averageLength,
    longestSentence:
      longestSentence.substring(0, 100) +
      (longestSentence.length > 100 ? "..." : ""),
    shortestSentence:
      shortestSentence.substring(0, 100) +
      (shortestSentence.length > 100 ? "..." : ""),
    longestSentenceWordCount: getWords(longestSentence).length,
    shortestSentenceWordCount: getWords(shortestSentence).length,
  };
}

export default analyzeText;
