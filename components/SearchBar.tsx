import React, { useState, useCallback } from 'react';
import { Search, Loader2, Sparkles } from 'lucide-react';
import { SearchBarProps } from '../types';

export const SearchBar: React.FC<SearchBarProps> = ({ onGenerate, isGenerating }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;
    
    await onGenerate(prompt);
    setPrompt('');
  }, [prompt, isGenerating, onGenerate]);

  return (
    <div className="w-full max-w-3xl mx-auto mb-10 sticky top-4 z-40 px-4">
      <form 
        onSubmit={handleSubmit}
        className={`
          relative flex items-center w-full h-14 rounded-full 
          bg-white shadow-lg border border-gray-200 
          transition-all duration-300 ease-in-out
          ${isGenerating ? 'opacity-90 cursor-wait' : 'hover:shadow-xl hover:border-gray-300'}
        `}
      >
        <div className="pl-5 pr-3 text-gray-400">
          {isGenerating ? (
            <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
          ) : (
            <Search className="w-5 h-5" />
          )}
        </div>
        
        <input
          type="text"
          className="flex-grow h-full bg-transparent outline-none text-gray-700 placeholder-gray-400 text-lg"
          placeholder={isGenerating ? "Dreaming up your image..." : "Describe what you want to see..."}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isGenerating}
        />

        <button
          type="submit"
          disabled={!prompt.trim() || isGenerating}
          className={`
            mr-2 px-6 py-2 rounded-full flex items-center gap-2 font-medium transition-all duration-200
            ${prompt.trim() && !isGenerating 
              ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
          `}
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate</span>
        </button>
      </form>
    </div>
  );
};
