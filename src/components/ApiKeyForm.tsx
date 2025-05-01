
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getApiKey, setApiKey, resetApiKeyToDefault, isUsingDefaultApiKey } from '@/lib/geminiService';
import { toast } from 'sonner';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const ApiKeyForm: React.FC = () => {
  const [key, setKey] = useState('');
  const [isCustomKey, setIsCustomKey] = useState(false);
  const [isSet, setIsSet] = useState(true); // Default is true since we have a default key

  useEffect(() => {
    // Check if using a custom key or the default key
    setIsCustomKey(!isUsingDefaultApiKey());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!key.trim()) {
      toast.error('Please enter a valid Gemini API key');
      return;
    }
    
    try {
      setApiKey(key);
      setIsSet(true);
      setIsCustomKey(true);
      toast.success('Custom API key saved successfully');
      setKey(''); // Clear the input field for security
    } catch (error) {
      toast.error('Failed to save API key');
    }
  };

  const handleReset = () => {
    if (isCustomKey) {
      resetApiKeyToDefault();
      setIsCustomKey(false);
      toast.info('Reverted to default API key');
    } else {
      setIsCustomKey(true);
      setIsSet(false);
      toast.info('Enter your custom API key');
    }
  };

  const toggleApiKeyType = (checked: boolean) => {
    if (checked) {
      // User wants to use their own key
      setIsCustomKey(true);
      setIsSet(false);
    } else {
      // User wants to use default key
      resetApiKeyToDefault();
      setIsCustomKey(false);
      setIsSet(true);
      toast.info('Using default API key');
    }
  };

  return (
    <div className="mb-4 p-4 border rounded-md bg-muted">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium">API Key Settings</h3>
        <div className="flex items-center space-x-2">
          <Label htmlFor="use-custom-key" className="text-xs text-muted-foreground mr-2">
            Use Custom Key
          </Label>
          <Switch 
            id="use-custom-key" 
            checked={isCustomKey}
            onCheckedChange={toggleApiKeyType}
          />
        </div>
      </div>

      {isCustomKey ? (
        isSet ? (
          <div className="p-3 border rounded-md bg-green-50 dark:bg-green-950">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-green-700 dark:text-green-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span>Custom Gemini API key is set</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleReset}>Change API Key</Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="flex space-x-2">
              <Input
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Enter your Gemini API key"
                className="flex-1"
              />
              <Button type="submit" size="sm">Save Key</Button>
              <Button type="button" variant="outline" size="sm" onClick={handleReset}>
                Use Default
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Your API key is stored securely in browser memory and is never sent to our servers.
            </p>
          </form>
        )
      ) : (
        <div className="p-3 border rounded-md bg-blue-50 dark:bg-blue-950">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4"/>
                <path d="M12 8h.01"/>
              </svg>
              <span>Using default Gemini API key</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleReset}>Use Custom Key</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiKeyForm;
