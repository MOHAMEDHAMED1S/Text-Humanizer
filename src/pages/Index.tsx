import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TextInputForm from '@/components/TextInputForm';
import TextResultCard from '@/components/TextResultCard';
import ApiKeyForm from '@/components/ApiKeyForm';
import { 
  calculateHumanizationScore, 
  getHumanizationLevel
} from '@/lib/textAnalysis';
import { humanizeTextWithGemini } from '@/lib/geminiService';
import { toast } from 'sonner';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [originalText, setOriginalText] = useState('');
  const [humanizedText, setHumanizedText] = useState('');
  const [originalScore, setOriginalScore] = useState(0);
  const [humanizedScore, setHumanizedScore] = useState(0);
  
  const handleTextSubmit = async (text: string) => {
    setIsLoading(true);
    
    try {
      // Calculate the original humanization score
      const score = calculateHumanizationScore(text);
      setOriginalText(text);
      setOriginalScore(score);
      
      // Get humanized text from Gemini API
      const newText = await humanizeTextWithGemini(text);
      
      // Calculate the new score
      const newScore = calculateHumanizationScore(newText);
      
      setHumanizedText(newText);
      setHumanizedScore(newScore);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to humanize text');
      // Keep the original text but clear humanized text in case of error
      setHumanizedText('');
      setHumanizedScore(0);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Introduction */}
          <section className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Transform Your Writing</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our advanced AI technology analyzes and enhances your text to make it sound more natural and human-like.
              Perfect for content creators, students, and professionals.
            </p>
          </section>
          
          {/* API Key Form */}
          <section>
            <ApiKeyForm />
          </section>
          
          {/* Input Form */}
          <section className="py-4">
            <TextInputForm onSubmit={handleTextSubmit} isLoading={isLoading} />
          </section>
          
          {/* Results */}
          {originalText && (
            <section className="py-4 space-y-6">
              <h3 className="text-xl font-semibold">Results</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextResultCard 
                  title="Original Text"
                  text={originalText}
                  humanizationScore={originalScore}
                  level={getHumanizationLevel(originalScore)}
                />
                
                <TextResultCard 
                  title="Humanized Text"
                  text={humanizedText || 'Processing...'}
                  humanizationScore={humanizedScore}
                  level={getHumanizationLevel(humanizedScore)}
                />
              </div>
              
              <div className="bg-secondary/50 rounded-lg p-4 text-sm">
                <h4 className="font-medium mb-2">How we measure humanization:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Linguistic complexity using readability scores</li>
                  <li>Word diversity and vocabulary richness</li>
                  <li>Sentence length variation and natural phrasing</li>
                  <li>Detection of repetitive patterns</li>
                </ul>
              </div>
            </section>
          )}
          
          {/* Info Cards */}
          {!originalText && (
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
              <div className="bg-secondary/50 rounded-lg p-6">
                <div className="mb-4 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                    <path d="M12 9v4" />
                    <path d="M12 17h.01" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium">Easy to Use</h3>
                <p className="text-muted-foreground">Simply paste your text and click the humanize button to transform your writing instantly.</p>
              </div>
              
              <div className="bg-secondary/50 rounded-lg p-6">
                <div className="mb-4 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium">Privacy Focused</h3>
                <p className="text-muted-foreground">Your text is processed locally in your browser and never stored on our servers.</p>
              </div>
              
              <div className="bg-secondary/50 rounded-lg p-6">
                <div className="mb-4 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" x2="9.01" y1="9" y2="9" />
                    <line x1="15" x2="15.01" y1="9" y2="9" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium">High Accuracy</h3>
                <p className="text-muted-foreground">Our advanced algorithms analyze multiple aspects of your text to provide comprehensive improvements.</p>
              </div>
            </section>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
