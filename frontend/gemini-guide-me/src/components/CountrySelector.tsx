import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CountrySelectorProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  onContinue: () => void;
}

const countries = [
  "United States", "United Kingdom", "Canada", "Australia", "India",
  "Germany", "France", "Japan", "South Korea", "Brazil",
  "Mexico", "Spain", "Italy", "Netherlands", "Sweden",
  "Singapore", "UAE", "South Africa", "New Zealand", "Ireland"
];

export const CountrySelector = ({ selectedCountry, onCountryChange, onContinue }: CountrySelectorProps) => {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6">
      <Card className="w-full max-w-xl p-8 backdrop-blur-xl bg-white/[0.03] border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, #FF6B8B, #FF8E9E)" }}>
            DataFactZ
          </h1>
          <p className="text-lg text-white/80">
            Tell us a few quick answers to get fast, tailored recommendations.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-lg font-medium mb-3 block text-white/90">
              Select your country
            </label>
            <Select value={selectedCountry} onValueChange={onCountryChange}>
              <SelectTrigger className="h-14 bg-white/[0.03] border-white/10 text-white/90 text-lg">
                <SelectValue placeholder="Choose your location" />
              </SelectTrigger>
              <SelectContent className="bg-[rgb(16,12,35)] border-white/10">
                {countries.map((country) => (
                  <SelectItem 
                    key={country} 
                    value={country} 
                    className="text-white/90 hover:bg-white/5 focus:bg-white/5 text-lg"
                  >
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={onContinue}
            disabled={!selectedCountry}
            className="w-full h-14 text-lg font-medium bg-gradient-to-r from-[#FF6B8B] to-[#FF8E9E] hover:opacity-90 text-white border-0"
          >
            Continue
          </Button>
        </div>
      </Card>
    </section>
  );
};
