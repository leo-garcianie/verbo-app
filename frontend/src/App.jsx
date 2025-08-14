import { useState } from "react";
import TextInput from "./components/TextInput.jsx";
import AnalysisResults from "./components/AnalysisResults.jsx";
import { Info, Loader, Search } from "lucide-react";
import Features from "./components/Features.jsx";

function App() {
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeText = async (text) => {
    if (!text.trim()) {
      setError("Please, enter some text to analyze");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error occurred: ${response.status}`);
      }

      const result = await response.json();
      setAnalysis(result);
    } catch (e) {
      console.error("Analysis failed:", e);
      setError("Failed to analyze text. Try again later");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setAnalysis(null);
    setError(null);
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="bg-[#EFF3FC] sticky h-16 px-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-full">
          <a
            href=""
            className="flex items-center gap-1 text-[#2A2C33] font-semibold text-2xl"
          >
            <Search className="size-4" />
            Verbo
          </a>
          <button className="navbar-btn">
            <Info className="size-4" />
            Learn More
          </button>
        </div>
      </nav>

      {/* Main */}
      <main className="bg-[#EFF3FC]">
        {/* Text */}
        <div className="flex flex-col max-w-6xl mx-auto items-center justify-between py-16 px-5">
          <p className="text-[#4A4D56] text-xl lg:text-2xl font-light">
            This is Verbo
          </p>
          <h1 className="font-semibold text-[#2A2C33] text-6xl md:text-7xl lg:text-8xl text-center">
            Turn Text into Clarity
          </h1>
          <h2 className="font-medium text-[#4A4D56] text-center text-lg md:text-xl lg:text-2xl">
            From basic counts to deep insights - know your words inside out
          </h2>
        </div>

        <div className="flex flex-col items-center max-w-6xl mx-auto px-5">
          {/* Input */}
          <div className="space-y-6 w-full">
            <TextInput
              onAnalyze={analyzeText}
              isLoading={isLoading}
              onClear={handleClear}
            />

            {error && (
              <div>
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="mt-1 text-sm text-red-700">
                      Analysis Error
                    </h3>
                    <p className="mt-1 text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results */}
          <div className="w-full py-16">
            {isLoading && (
              <div className="flex gap-1 items-center justify-center py-6 text-[#2A2C33]">
                <Loader className="size-5 animate-spin" />
                <span>Analyzing text...</span>
              </div>
            )}

            {analysis && !isLoading && <AnalysisResults analysis={analysis} />}
          </div>
        </div>
      </main>

      {/* Features Section */}
      <Features />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-300 w-full flex h-12 items-center">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm text-[#4A4D56] font-light">
            © 2025 Verbo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
