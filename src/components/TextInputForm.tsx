
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';

interface TextInputFormProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

const TextInputForm: React.FC<TextInputFormProps> = ({ onSubmit, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      toast.error('Please enter some text to humanize.');
      return;
    }
    
    if (text.trim().split(/\s+/).length < 10) {
      toast.warning('Please enter at least 10 words for better results.');
      return;
    }
    
    onSubmit(text);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Textarea
          placeholder="Enter your text here to be humanized..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-40 p-4 text-base"
        />
        <div className="text-xs text-right text-muted-foreground">
          {text.trim().split(/\s+/).filter(Boolean).length} words
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full sm:w-auto"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          'Humanize'
        )}
      </Button>
    </form>
  );
};

export default TextInputForm;
