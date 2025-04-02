
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Pill, Search, SendHorizontal, Stethoscope, X } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const commonHealthIssues = [
  { query: "Headache remedies", response: "For headaches, rest in a quiet dark room, stay hydrated, and take over-the-counter pain relievers like acetaminophen or ibuprofen if appropriate. See a doctor if headaches are severe or persistent." },
  { query: "Fever treatment", response: "For fever, rest and drink plenty of fluids. Over-the-counter medications like acetaminophen or ibuprofen may help reduce fever. Seek medical attention if fever is high (above 103°F/39.4°C), lasts more than 3 days, or is accompanied by severe symptoms." },
  { query: "Stomach pain", response: "For stomach pain, try resting, avoiding solid foods temporarily, sipping clear liquids, and using a heating pad. Seek immediate medical care for severe or persistent pain, especially if accompanied by vomiting, fever, or blood in stool." },
  { query: "Common cold", response: "For a common cold, rest, stay hydrated, use over-the-counter decongestants or pain relievers if needed, and consider throat lozenges for sore throat. Most colds resolve within 7-10 days. See a doctor if symptoms worsen or persist longer." },
  { query: "Minor cuts", response: "For minor cuts, clean the wound with soap and water, apply gentle pressure to stop bleeding, apply an antibiotic ointment, and cover with a clean bandage. Seek medical attention if the cut is deep, has jagged edges, or shows signs of infection." },
];

const AIHealthAssistant = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    
    // Simulate AI response with a delay
    setTimeout(() => {
      const matchedIssue = commonHealthIssues.find(issue => 
        query.toLowerCase().includes(issue.query.toLowerCase())
      );
      
      if (matchedIssue) {
        setResponse(matchedIssue.response);
      } else {
        setResponse("I'm sorry, I don't have specific information about that health issue. For any health concerns, it's best to consult with a healthcare professional for personalized advice.");
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    
    const matchedIssue = commonHealthIssues.find(issue => 
      suggestion.toLowerCase().includes(issue.query.toLowerCase())
    );
    
    if (matchedIssue) {
      setIsLoading(true);
      setTimeout(() => {
        setResponse(matchedIssue.response);
        setIsLoading(false);
      }, 800);
    }
  };

  const clearAll = () => {
    setQuery('');
    setResponse('');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Stethoscope className="h-5 w-5 text-swift-red" />
          AI Health Assistant
        </CardTitle>
        <CardDescription>
          Get basic guidance for common health issues
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Describe your symptoms or ask a health question..."
                className="pl-9"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button type="submit" size="icon" disabled={isLoading}>
              <SendHorizontal size={18} />
            </Button>
            {(query || response) && (
              <Button type="button" size="icon" variant="outline" onClick={clearAll}>
                <X size={18} />
              </Button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {commonHealthIssues.map((issue, index) => (
              <Button
                key={index}
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => handleSuggestionClick(issue.query)}
              >
                <Pill size={14} />
                {issue.query}
              </Button>
            ))}
          </div>
        </form>
        
        {isLoading && (
          <div className="mt-4 text-center">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-swift-red border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-2 text-sm text-gray-500">Analyzing your query...</p>
          </div>
        )}
        
        {response && !isLoading && (
          <div className="mt-4 rounded-md bg-gray-50 p-4">
            <p className="text-sm text-gray-700">{response}</p>
            <div className="mt-3 flex items-center gap-1 text-xs text-gray-500">
              <span className="font-medium">Note:</span> This is basic guidance only. Always consult a healthcare professional for medical advice.
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        <p>For emergencies, always call emergency services or visit the nearest hospital.</p>
      </CardFooter>
    </Card>
  );
};

export default AIHealthAssistant;
