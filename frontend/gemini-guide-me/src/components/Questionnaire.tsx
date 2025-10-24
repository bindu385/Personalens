import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { questionnaires, Question } from "@/lib/questionnaires";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface QuestionnaireProps {
  category: string;
  country: string;
  onComplete: (answers: Record<string, any>) => void;
  onBack: () => void;
}

export const Questionnaire = ({ category, country, onComplete, onBack }: QuestionnaireProps) => {
  const questionnaire = questionnaires.find(q => q.category === category);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const refs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    // ensure refs array length
    if (questionnaire) refs.current = Array(questionnaire.questions.length).fill(null);
  }, [questionnaire]);

  if (!questionnaire) return null;

  const total = questionnaire.questions.length;
  const answeredCount = questionnaire.questions.filter(q => answers[q.id] !== undefined && answers[q.id] !== '').length;
  const progress = (answeredCount / total) * 100;

  const setAnswerFor = (qid: string, value: any, index?: number, autoNext = false) => {
    setAnswers(prev => ({ ...prev, [qid]: value }));
    if (autoNext && typeof index === 'number') {
      const next = index + 1;
      if (next < refs.current.length) {
        refs.current[next]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // focus first interactive element
        const el = refs.current[next]?.querySelector('input, textarea, select, button') as HTMLElement | null;
        el?.focus();
      }
    }
  };

  const handleMultiSelect = (qid: string, option: string, checked: boolean) => {
    const current = answers[qid] || [];
    if (checked) setAnswerFor(qid, [...current, option]);
    else setAnswerFor(qid, current.filter((item: string) => item !== option));
  };

  const scrollTo = (idx: number) => {
    refs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const el = refs.current[idx]?.querySelector('input, textarea, select, button') as HTMLElement | null;
    el?.focus();
  };

  const allAnswered = questionnaire.questions.every(q => {
    if (q.type === 'multiselect') return (answers[q.id] || []).length > 0;
    return answers[q.id] !== undefined && answers[q.id] !== '';
  });

  return (
    <section className="py-12 bg-[#0F0817]">
      <div className="max-w-4xl mx-auto space-y-6 px-4">
        {/* Header Card */}
        <Card className="p-6 bg-[#1A1024] border border-orange-500/10 hover:border-orange-500/20 rounded-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 text-transparent bg-clip-text">
                {category}
              </h2>
              <p className="text-purple-200/70">{answeredCount} / {total} answered</p>
            </div>
            <div className="w-48">
              <Progress 
                value={progress} 
                className="h-2 bg-purple-900/30 overflow-hidden rounded-full"
                indicatorClassName="bg-gradient-to-r from-orange-500 to-pink-500"
              />
            </div>
          </div>
        </Card>

        {/* Questions */}
        {questionnaire.questions.map((question, idx) => (
          <Card
            key={question.id}
            ref={(el) => (refs.current[idx] = el)}
            className="p-6 bg-[#1A1024] border border-orange-500/10 hover:border-orange-500/20 rounded-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                {idx + 1}. {question.question}
              </h3>
              <div className="text-sm text-orange-400/70">
                {answers[question.id] ? 'Answered' : 'Unanswered'}
              </div>
            </div>

            {/* Select Input */}
            {question.type === 'select' && (
              <Select
                value={answers[question.id] || ''}
                onValueChange={(v) => setAnswerFor(question.id, v, idx, true)}
              >
                <SelectTrigger className="w-full bg-[#2A1B37] border-orange-500/10 hover:border-orange-500/20 text-white">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent className="bg-[#2A1B37] border border-orange-500/10">
                  {question.options?.map((option) => (
                    <SelectItem
                      key={option}
                      value={option}
                      className="text-white hover:bg-orange-500/10 focus:bg-orange-500/20"
                    >
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {/* Text Input */}
            {question.type === 'text' && (
              <Textarea
                placeholder={question.placeholder || 'Type your answer'}
                className="w-full bg-[#2A1B37] border-orange-500/10 text-white min-h-28"
                value={answers[question.id] || ''}
                onChange={(e) => setAnswerFor(question.id, e.target.value)}
              />
            )}

            {/* Number Input */}
            {question.type === 'number' && (
              <Input
                type="number"
                className="w-full bg-[#2A1B37] border-orange-500/10 text-white"
                value={answers[question.id] ?? ''}
                onChange={(e) => setAnswerFor(question.id, e.target.value)}
              />
            )}

            {/* Multiselect (checkbox list) */}
            {question.type === 'multiselect' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {question.options?.map((option) => {
                  const checked = (answers[question.id] || []).includes(option);
                  return (
                    <label
                      key={option}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 bg-[#2A1B37] border border-orange-500/10 text-white cursor-pointer hover:bg-orange-500/5"
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(v) =>
                          handleMultiSelect(question.id, option, Boolean(v))
                        }
                      />
                      <span>{option}</span>
                    </label>
                  );
                })}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-6 flex gap-4">
              <Button 
                variant="outline" 
                onClick={() => idx === 0 ? onBack() : scrollTo(idx - 1)}
                className="border-orange-500/10 text-purple-200 hover:bg-orange-500/5 hover:border-orange-500/20"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {idx === 0 ? 'Back to Categories' : 'Previous'}
              </Button>
              {idx === questionnaire.questions.length - 1 && (
                <div className="ml-auto">
                  <Button
                    onClick={() => onComplete(answers)}
                    disabled={!allAnswered}
                    className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20"
                  >
                    Get Recommendations
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};