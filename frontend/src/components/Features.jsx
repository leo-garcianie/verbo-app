import {ChartColumnBig, Book, Type, Search} from "lucide-react";

const Features = () => {
  return (
    <div className="bg-white border-t border-gray-300 w-full flex flex-col gap-7 md:gap-10 items-center justify-center py-12 md:py-20 px-5">
      <h2 className="text-3xl md:text-4xl font-semibold text-[#4A4D56] text-center">
        What We Analyze
      </h2>
      <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-10 md:p-16 border border-gray-300 rounded-xl">
        {/* 1 */}
        <div className="flex flex-col gap-2 items-start justify-center">
          <div className="size-16 rounded-lg text-white flex items-center justify-center bg-gradient-to-t from-[#589CFC] to-[#86B7FD] shadow-inner-2">
            <ChartColumnBig className="size-10 drop-shadow-lg" />
          </div>
          <h3 className="font-semibold text-xl text-[#4A4D56]">
            Basic Statistics
          </h3>
          <p className="text-sm text-[#4A4D56] font-light">
            Word count, character count, sentences, and paragraphs
          </p>
        </div>

        {/* 2 */}
        <div className="flex flex-col gap-2 items-start justify-center">
          <div className="size-16 rounded-lg text-white flex items-center justify-center bg-gradient-to-t from-[#00DF13] to-[#00C600] shadow-inner-2">
            <Book className="size-10 drop-shadow-lg" />
          </div>
          <h3 className="font-semibold text-xl text-[#4A4D56]">Readability</h3>
          <p className="text-sm text-[#4A4D56] font-light">
            Flesch score, reading level, and estimated reading time
          </p>
        </div>

        {/* 3 */}
        <div className="flex flex-col gap-2 items-start justify-center">
          <div className="size-16 rounded-lg text-white flex items-center justify-center bg-gradient-to-t from-[#FD8586] to-[#FC4C4D] shadow-inner-2">
            <Type className="size-10 drop-shadow-lg" />
          </div>
          <h3 className="font-semibold text-xl text-[#4A4D56]">
            Word Analysis
          </h3>
          <p className="text-sm text-[#4A4D56] font-light">
            Most common word, word length, and vocabulary richness
          </p>
        </div>

        {/* 4 */}
        <div className="flex flex-col gap-2 items-start justify-center">
          <div className="size-16 rounded-lg text-white flex items-center justify-center bg-gradient-to-t from-[#FAE08F] to-[#FAD360] shadow-inner-2">
            <Search className="size-10 drop-shadow-lg" />
          </div>
          <h3 className="font-semibold text-xl text-[#4A4D56]">
            Deep Insights
          </h3>
          <p className="text-sm text-[#4A4D56] font-light">
            Character breakdown and sentence structure analysis
          </p>
        </div>
      </div>
    </div>
  );
};
export default Features;
