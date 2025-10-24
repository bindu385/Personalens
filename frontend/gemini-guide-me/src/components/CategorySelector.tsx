import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { questionnaires } from "@/lib/questionnaires";

interface CategorySelectorProps {
  onSelectCategory: (category: string) => void;
}

export const CategorySelector = ({ onSelectCategory }: CategorySelectorProps) => {
  return (
    <section className="py-12 bg-[#0F0817]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 text-transparent bg-clip-text mb-4">
            Choose a Category
          </h1>
          <p className="text-purple-200/70 text-lg">
            Select the area you'd like recommendations for
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {questionnaires.map((category) => (
            <Card
              key={category.category}
              className="p-6 bg-[#1A1024] border border-orange-500/10 hover:border-orange-500/20 rounded-xl transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h2 className="text-2xl font-semibold text-white mb-3">
                  {category.category}
                </h2>
                <p className="text-purple-200/70 mb-6">
                  {category.description}
                </p>
                <button
                  onClick={() => onSelectCategory(category.category)}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20"
                >
                  Select
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};