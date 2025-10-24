import { Sparkles, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ResultsProps {
  category: string;
  recommendations: string | null;
  isLoading: boolean;
  onStartOver: () => void;
}

export const Results = ({ category, recommendations, isLoading, onStartOver }: ResultsProps) => {
  return (
    <section className="py-12 bg-[#0F0817]">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="p-8 bg-[#1A1024] border border-orange-500/10 hover:border-orange-500/20 rounded-xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-orange-500/90" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 text-transparent bg-clip-text">
              Your Personalized Recommendations
            </h1>
          </div>

          <p className="text-purple-200/70 mb-8">
            Based on your responses for{" "}
            <span className="text-orange-400">{category}</span>
          </p>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-12 h-12 animate-spin text-orange-400 mb-4" />
              <p className="text-lg text-purple-200/70">
                AI is analyzing your responses and generating personalized recommendations...
              </p>
            </div>
          ) : recommendations ? (
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-purple-100 leading-relaxed rounded-lg bg-[#2A1B37] p-6 border border-orange-500/5">
                {recommendations}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-purple-200/70">
                Unable to generate recommendations. Please try again.
              </p>
            </div>
          )}

          <button
            onClick={onStartOver}
            className="mt-8 w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20"
          >
            Back to HomePage
          </button>
        </Card>
      </div>
    </section>
  );
};