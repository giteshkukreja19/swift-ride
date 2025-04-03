
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Pill, Search, SendHorizontal, Stethoscope, X, Heart, Brain, AlarmClock, Thermometer } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const commonHealthIssues = [
  { query: "Headache remedies", response: "For headaches, rest in a quiet dark room, stay hydrated, and take over-the-counter pain relievers like acetaminophen or ibuprofen if appropriate. See a doctor if headaches are severe or persistent." },
  { query: "Fever treatment", response: "For fever, rest and drink plenty of fluids. Over-the-counter medications like acetaminophen or ibuprofen may help reduce fever. Seek medical attention if fever is high (above 103°F/39.4°C), lasts more than 3 days, or is accompanied by severe symptoms." },
  { query: "Stomach pain", response: "For stomach pain, try resting, avoiding solid foods temporarily, sipping clear liquids, and using a heating pad. Seek immediate medical care for severe or persistent pain, especially if accompanied by vomiting, fever, or blood in stool." },
  { query: "Common cold", response: "For a common cold, rest, stay hydrated, use over-the-counter decongestants or pain relievers if needed, and consider throat lozenges for sore throat. Most colds resolve within 7-10 days. See a doctor if symptoms worsen or persist longer." },
  { query: "Minor cuts", response: "For minor cuts, clean the wound with soap and water, apply gentle pressure to stop bleeding, apply an antibiotic ointment, and cover with a clean bandage. Seek medical attention if the cut is deep, has jagged edges, or shows signs of infection." },
  { query: "Blood pressure concerns", response: "Normal blood pressure is around 120/80 mmHg. High blood pressure (above 130/80 mmHg) often has no symptoms but can be managed with lifestyle changes like reducing salt intake, regular exercise, maintaining a healthy weight, and medication if prescribed by a doctor." },
  { query: "Diet recommendations", response: "A healthy diet includes plenty of fruits, vegetables, whole grains, lean proteins, and healthy fats. Limit processed foods, added sugars, and excessive salt. Stay hydrated and practice mindful eating. Consider consulting a registered dietitian for personalized advice." },
];

const medicationReminders = [
  { name: "Blood Pressure Medication", time: "8:00 AM", description: "Take with food" },
  { name: "Vitamin Supplement", time: "9:00 AM", description: "Take with breakfast" },
  { name: "Allergy Medication", time: "10:00 PM", description: "Take before bed" },
];

interface VitalReading {
  timestamp: string;
  systolic: number;
  diastolic: number;
  pulse: number;
}

const AIHealthAssistant = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('chatbot');

  // Mock BP monitor data
  const [vitalReadings, setVitalReadings] = useState<VitalReading[]>([
    { timestamp: "2025-04-03 08:30", systolic: 120, diastolic: 80, pulse: 72 },
    { timestamp: "2025-04-02 09:15", systolic: 118, diastolic: 78, pulse: 70 },
    { timestamp: "2025-04-01 08:45", systolic: 122, diastolic: 82, pulse: 74 },
  ]);

  // Add a new demo reading
  const addDemoReading = () => {
    const systolic = Math.floor(Math.random() * 20) + 110; // Random between 110-130
    const diastolic = Math.floor(Math.random() * 15) + 70; // Random between 70-85
    const pulse = Math.floor(Math.random() * 20) + 65; // Random between 65-85
    
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const newReading: VitalReading = {
      timestamp,
      systolic,
      diastolic,
      pulse
    };
    
    setVitalReadings([newReading, ...vitalReadings]);
  };

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
          Get basic guidance for common health issues and track your vitals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chatbot" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="chatbot" className="flex items-center gap-1">
              <Stethoscope className="h-4 w-4" />
              <span>Health Assistant</span>
            </TabsTrigger>
            <TabsTrigger value="vitals" className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>BP Monitor</span>
            </TabsTrigger>
            <TabsTrigger value="reminders" className="flex items-center gap-1">
              <AlarmClock className="h-4 w-4" />
              <span>Reminders</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chatbot">
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
          </TabsContent>
          
          <TabsContent value="vitals">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-md font-medium">Blood Pressure Readings</h3>
                <Button onClick={addDemoReading} size="sm" variant="outline">
                  <Heart className="mr-2 h-4 w-4 text-swift-red" />
                  Connect BP Monitor
                </Button>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-gray-700">
                  <div className="flex justify-between font-medium border-b pb-2 mb-2">
                    <span>Date & Time</span>
                    <span>Systolic</span>
                    <span>Diastolic</span>
                    <span>Pulse</span>
                  </div>
                  {vitalReadings.length === 0 ? (
                    <p className="text-center py-4 text-gray-500">No readings available. Connect your BP monitor.</p>
                  ) : (
                    vitalReadings.map((reading, index) => (
                      <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                        <span>{reading.timestamp}</span>
                        <span className={reading.systolic > 130 ? "text-swift-red font-medium" : ""}>{reading.systolic}</span>
                        <span className={reading.diastolic > 85 ? "text-swift-red font-medium" : ""}>{reading.diastolic}</span>
                        <span>{reading.pulse}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              <div className="rounded-md bg-blue-50 p-3 text-sm">
                <div className="flex items-start gap-2">
                  <Thermometer className="h-4 w-4 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-700">Blood Pressure Categories</p>
                    <ul className="mt-1 space-y-1 text-blue-700">
                      <li>Normal: Less than 120/80 mmHg</li>
                      <li>Elevated: 120-129 / Less than 80 mmHg</li>
                      <li>High Blood Pressure (Stage 1): 130-139 / 80-89 mmHg</li>
                      <li>High Blood Pressure (Stage 2): 140+ / 90+ mmHg</li>
                      <li>Hypertensive Crisis: Higher than 180 / Higher than 120 mmHg</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reminders">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-md font-medium">Medication Reminders</h3>
                <Button size="sm" variant="outline">
                  <AlarmClock className="mr-2 h-4 w-4" />
                  Add Reminder
                </Button>
              </div>
              
              <div className="bg-gray-50 rounded-md">
                {medicationReminders.map((reminder, index) => (
                  <div key={index} className="p-3 border-b border-gray-100 last:border-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{reminder.name}</p>
                        <p className="text-sm text-gray-500">{reminder.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium bg-gray-200 px-2 py-1 rounded">
                          <AlarmClock className="inline-block mr-1 h-3 w-3" />
                          {reminder.time}
                        </span>
                        <Button size="sm" variant="ghost">
                          <X size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="rounded-md bg-green-50 p-3 text-sm">
                <div className="flex items-start gap-2">
                  <Brain className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-700">Health Tip</p>
                    <p className="mt-1 text-green-700">
                      Taking medications at the same time each day helps maintain consistent levels in your system and improves effectiveness. Setting reminders can help you stay on track.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        <p>For emergencies, always call emergency services or visit the nearest hospital.</p>
      </CardFooter>
    </Card>
  );
};

export default AIHealthAssistant;
