export function getWords(text) {
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
}

export function getSentences(text) {
  return text.split(/[.!?]+/).filter((sentence) => sentence.trim().length > 0);
}

export function getParagraphs(text) {
  return text
    .split(/\n\s*\n/)
    .filter((paragraph) => paragraph.trim().length > 0);
}

export function countTotalSyllables(words) {
  return words.reduce((total, word) => total + countSyllables(word), 0);
}

export function getReadingLevel(fleschScore) {
  if (fleschScore >= 90) return "Very Easy";
  if (fleschScore >= 80) return "Easy";
  if (fleschScore >= 70) return "Fairly Easy";
  if (fleschScore >= 60) return "Standard";
  if (fleschScore >= 50) return "Fairly Difficult";
  if (fleschScore >= 30) return "Difficult";
  return "Very Difficult";
}

export function countSyllables(word) {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;

  const vowels = "aeiouy";
  let syllableCount = 0;
  let previousWasVowel = false;

  for (let i = 0; i < word.length; i++) {
    const isVowel = vowels.includes(word[i]);
    if (isVowel && !previousWasVowel) {
      syllableCount++;
    }
    previousWasVowel = isVowel;
  }

  // Silent 'e'
  if (word.endsWith("e")) {
    syllableCount--;
  }

  return Math.max(1, syllableCount);
}
