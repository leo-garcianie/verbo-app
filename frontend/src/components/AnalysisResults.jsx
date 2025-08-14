import Card from "./Card.jsx";

const AnalysisResults = ({ analysis }) => {
  if (!analysis) return null;

  const { basic, readability, words, characters, sentences } = analysis;

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Basic Statistics */}
      <section className="w-full flex flex-col gap-2 md:gap-4">
        <h3 className="text-[#2A2C33] font-medium text-xl md:text-2xl">
          Basic Statistics
        </h3>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
          <Card
            label="Characters"
            value={basic.characterCount.toLocaleString()}
            subtitle={`${basic.characterCountNoSpaces.toLocaleString()} without spaces`}
            color="blue"
          />
          <Card
            label="Words"
            value={basic.wordCount.toLocaleString()}
            subtitle={`${basic.averageWordsPerSentence} avg per sentence`}
            color="green"
          />
          <Card
            label="Sentences"
            value={basic.sentenceCount.toLocaleString()}
            subtitle={`${basic.averageSentencesPerParagraph} avg per paragraph`}
            color="pink"
          />
          <Card
            label="Paragraphs"
            value={basic.paragraphCount.toLocaleString()}
            subtitle={`${basic.characterCountNoSpaces.toLocaleString()} without spaces`}
            color="yellow"
          />
        </div>
      </section>

      {/* Readability */}
      <section className="flex flex-col gap-2 md:gap-4 w-full">
        <h3 className="text-[#2A2C33] font-medium text-xl md:text-2xl">
          Readability Analysis
        </h3>
        <div className="w-full flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
            <Card
              label="Flesch Reading Score"
              value={readability.fleschScore}
              subtitle={readability.readingLevel}
              color="green"
            />
            <Card
              label="Reading Time"
              value={`${readability.estimatedReadingTimeMinutes} min`}
              subtitle={`${readability.averageSyllablesPerWord} syllables per word`}
              color="blue"
            />
          </div>
          <div className="flex flex-col gap-2 p-4 md:p-6 bg-gradient-to-t from-green-50/60 to-green-100/60 border border-slate-200 rounded-xl shadow-inner-2">
            <h4 className="font-medium text-base text-[#6A7282]">
              Reading Level Guide:
            </h4>
            <div className="text-[#6A7282] text-sm font-normal grid grid-cols-1 sm:grid-cols-2 gap-2">
              <span>90-100: Very Easy</span>
              <span>80-89: Easy</span>
              <span>70-79: Fairly Easy</span>
              <span>60-69: Standard</span>
              <span>50-59: Fairly Difficult</span>
              <span>0-49: Difficult</span>
            </div>
          </div>
        </div>
      </section>

      {/* Word Analysis */}
      <section className="flex flex-col gap-2 md:gap-4">
        <h3 className="text-[#2A2C33] font-medium text-xl md:text-2xl">Word Analysis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
          <Card
            label="Unique Words"
            value={words.uniqueWords.toLocaleString()}
            subtitle={`${((words.uniqueWords / basic.wordCount) * 100).toFixed(1)}% vocabulary richness`}
            color="pink"
          />
          <Card
            label="Average Word Length"
            value={`${words.averageWordLength} chars`}
            subtitle={`Longest: ${words.longestWord.substring(0, 15)}${words.longestWord.length > 15 ? "..." : ""}`}
            color="blue"
          />
        </div>

        <div className="flex flex-col gap-3 rounded-xl p-4 md:p-6 bg-gradient-to-t from-slate-50 to-slate-100 border border-slate-200 shadow-inner-2">
          <h4 className="font-medium text-base text-[#6A7282]">
            Most Common Words
          </h4>
          <div className="space-y-2">
            {words.mostCommonWords.slice(0, 5).map((item, index) => (
              <div
                key={item.word}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-normal text-[#2A2C33] w-4">
                    #{index + 1}
                  </span>
                  <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    {item.word}
                  </span>
                </div>
                <span className="text-sm font-semibold text-[#2A2C33]">
                  {item.count}x
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Character Breakdown */}
      <section className="flex flex-col gap-2 md:gap-3">
        <h3 className="text-[#2A2C33] font-medium text-xl md:text-2xl">
          Character Breakdown
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
          <Card
            label="Letters"
            value={characters.letters.toLocaleString()}
            subtitle={`${characters.uppercaseLetters} uppercase`}
            color="yellow"
          />
          <Card
            label="Numbers"
            value={characters.numbers.toLocaleString()}
            color="blue"
          />
          <Card
            label="Punctuation"
            value={characters.punctuation.toLocaleString()}
            color="pink"
          />
          <Card
            label="Spaces"
            value={characters.spaces.toLocaleString()}
            color="gray"
          />
          <Card
            label="Special Characters"
            value={characters.specialCharacters.toLocaleString()}
            color="red"
          />
          <Card
            label="Lowercase"
            value={characters.lowercaseLetters.toLocaleString()}
            color="green"
          />
        </div>
      </section>

      {/* Sentence Analysis */}
      <section className="flex flex-col gap-2 md:gap-3">
        <h3 className="text-[#2A2C33] font-medium text-xl md:text-2xl">
          Sentence Structure
        </h3>
          <Card
            label="Average Sentence Length"
            value={`${sentences.averageSentenceLength} words`}
            subtitle={`Range: ${sentences.shortestSentenceWordCount} - ${sentences.longestSentenceWordCount} words`}
            color='blue'
          />

        <div className="flex flex-col gap-2 rounded-xl p-4 md:p-6 bg-gradient-to-t from-slate-50 to-slate-100 border border-slate-200 shadow-inner-2">
          <h4 className="font-medium text-base text-[#6A7282]">
            Longest Sentence
          </h4>
          <p className="text-sm text-[#2A2C33] italic bg-gray-100 p-3 rounded">
            "{sentences.longestSentence}"
          </p>
          <p className="text-[#6A7282] text-sm font-light">
            {sentences.longestSentenceWordCount} words
          </p>
        </div>

        <div className="flex flex-col gap-2 rounded-xl p-4 md:p-6 bg-gradient-to-t from-slate-50 to-slate-100 border border-slate-200 shadow-inner-2">
          <h4 className="font-medium text-base text-[#6A7282]">
            Shortest Sentence
          </h4>
          <p className="text-sm text-[#2A2C33] italic bg-gray-100 p-3 rounded">
            "{sentences.shortestSentence}"
          </p>
          <p className="text-[#6A7282] text-sm font-light">
            {sentences.shortestSentenceWordCount} words
          </p>
        </div>
      </section>
    </div>
  );
};

export default AnalysisResults;
