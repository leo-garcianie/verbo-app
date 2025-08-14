import { useState } from "react";
import { FileText, Send, Loader, Trash } from "lucide-react";

const TextInput = ({ onAnalyze, isLoading, onClear }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onAnalyze(text);
    }
  };

  const handleClear = () => {
    setText("");
    onClear();
  };

  const loadSampleText = () => {
    setText('In a small town, at dawn, the first rays of sunlight lit up the cobblestone streets while the sound of birdsong filled the air. Marta, holding a steaming cup of coffee, went over her to-do list: write a report, visit her grandmother, and water the garden plants. Meanwhile, the clock showed 7:45 a.m., and a cool breeze came through the window, carrying the scent of freshly baked bread. Could this be the start of a perfect day?');
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-full gap-2"
      >
        {/* TEXTAREA */}
        <textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here..."
          className="w-full h-52 p-4 bg-white focus:ring focus:ring-zinc-400 rounded-xl border border-gray-300 outline-none resize-none transition-colors duration-200 shadow-text-area"
          disabled={isLoading}
        />

        {/* DATA */}
        <div className="flex items-center justify-between w-full px-2 text-sm text-[#6A7282]">
          <span className="font-light">
            {text.length} characters •{" "}
            {
              text
                .trim()
                .split(/\s+/)
                .filter((word) => word.length > 0).length
            }{" "}
            words
          </span>

          <span className="font-light">
            {text.length > 0 ? "Ready to analyze" : "Enter text above"}
          </span>
        </div>

        {/* BUTTONS */}

        <div className="flex items-center justify-between w-full">
          <button
            onClick={loadSampleText}
            disabled={isLoading}
            className="secondary-btn"
            type='button'
          >
            <FileText className="size-4" />
            Sample Text
          </button>

          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={!text.trim() || isLoading}
              className="primary-btn"
            >
              {isLoading ? (
                <>
                  <Loader className="size-4 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  <span>Analyze Text</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleClear}
              disabled={isLoading || !text}
              className="secondary-btn"
            >
              <Trash className="size-4" />
              <span>Clear</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TextInput;
