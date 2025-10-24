import { useState, useRef } from "react";
import { useEffect } from "react";
import { CountrySelector } from "@/components/CountrySelector";
import { CategorySelector } from "@/components/CategorySelector";
import { Questionnaire } from "@/components/Questionnaire";
import { Results } from "@/components/Results";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Step = 'country' | 'category' | 'questionnaire' | 'results';

const Index = () => {
  const [step, setStep] = useState<Step>('country');
  const [country, setCountry] = useState('');
  const [category, setCategory] = useState('');
  const [recommendations, setRecommendations] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCountryContinue = () => {
    setStep('category');
    categoryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setStep('questionnaire');
    questionnaireRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleQuestionnaireComplete = async (answers: Record<string, any>) => {
    setStep('results');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('get-recommendations', {
        body: {
          category,
          country,
          answers
        }
      });

      if (error) {
        console.error('Error getting recommendations:', error);
        
        if (error.message?.includes('429')) {
          toast.error('Too many requests. Please try again in a moment.');
        } else if (error.message?.includes('402')) {
          toast.error('AI credits depleted. Please add credits to continue.');
        } else {
          toast.error('Failed to get recommendations. Please try again.');
        }
        setRecommendations(null);
        return;
      }

      if (data?.recommendations) {
        setRecommendations(data.recommendations);
    // scroll to results after recommendations are set
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
      } else {
        toast.error('No recommendations received. Please try again.');
        setRecommendations(null);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('An unexpected error occurred. Please try again.');
      setRecommendations(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = () => {
    setStep('country');
    setCountry('');
    setCategory('');
    setRecommendations(null);
  };

  const handleBackToCategory = () => {
    setStep('category');
    setCategory('');
    categoryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const countryRef = useRef<HTMLDivElement | null>(null);
  const categoryRef = useRef<HTMLDivElement | null>(null);
  const questionnaireRef = useRef<HTMLDivElement | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const scrollToCountry = () => { setStep('country'); countryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  useEffect(() => {
    const handler = () => {
      setStep('country');
      setCountry('');
      setCategory('');
      setRecommendations(null);
      // scroll to top and country section
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => countryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
    };

    window.addEventListener('go-home', handler as EventListener);
    return () => window.removeEventListener('go-home', handler as EventListener);
  }, []);

  return (
    <div className="min-h-screen bg-[#0F0817]">
      {step === 'country' && (
        <section className="py-12 text-left relative">
          <div ref={countryRef} className="max-w-4xl mx-auto px-4">
            <CountrySelector
              selectedCountry={country}
              onCountryChange={setCountry}
              onContinue={handleCountryContinue}
            />
          </div>
        </section>
      )}

      {step === 'category' && (
        <div ref={questionnaireRef} className="bg-[#0F0817]">
          <CategorySelector onSelectCategory={handleCategorySelect} />
        </div>
      )}

      {step === 'questionnaire' && (
        <div ref={questionnaireRef} className="bg-[#0F0817]">
          <Questionnaire
            category={category}
            country={country}
            onComplete={handleQuestionnaireComplete}
            onBack={handleBackToCategory}
          />
        </div>
      )}

      {step === 'results' && (
        <div ref={resultsRef} className="bg-[#0F0817]">
          <Results
            category={category}
            recommendations={recommendations}
            isLoading={isLoading}
            onStartOver={handleStartOver}
          />
        </div>
      )}
    </div>
  );
};

export default Index;