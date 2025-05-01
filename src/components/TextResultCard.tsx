
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface TextResultCardProps {
  title: string;
  text: string;
  humanizationScore: number;
  level: 'low' | 'medium' | 'high';
}

const TextResultCard: React.FC<TextResultCardProps> = ({ title, text, humanizationScore, level }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Text copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy text. Please try again.');
    });
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge 
            variant="outline" 
            className={`
              px-2 py-1
              ${level === 'low' ? 'bg-humanize-low/10 text-humanize-low border-humanize-low' : ''}
              ${level === 'medium' ? 'bg-humanize-medium/10 text-humanize-medium border-humanize-medium' : ''}
              ${level === 'high' ? 'bg-humanize-high/10 text-humanize-high border-humanize-high' : ''}
            `}
          >
            Humanization: {humanizationScore}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div 
          className="prose-custom rounded-md bg-secondary p-4 min-h-32 max-h-64 overflow-y-auto whitespace-pre-wrap"
        >
          {text}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={copyToClipboard}
          className="ml-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
          Copy
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TextResultCard;
