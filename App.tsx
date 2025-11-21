import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { MasonryGrid } from './components/MasonryGrid';
import { Modal } from './components/Modal';
import { GeneratedImage } from './types';
import { generateImageFromPrompt, fetchImages } from './services/gemini';
import { Zap } from 'lucide-react';

const App: React.FC = () => {
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const loadedImages = await fetchImages();
        setImages(loadedImages);
      } catch (err) {
        console.error('Failed to load images from server:', err);
      }
    };
    loadImages();
  }, []);

  useEffect(() => {
    // Animation/Styles
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes scaleIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
      .animate-fade-in {
        animation: fadeIn 0.5s ease-out forwards;
      }
      .animate-scale-in {
        animation: scaleIn 0.3s ease-out forwards;
      }
      .bg-pattern {
        background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
        background-size: 20px 20px;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);
    setError(null);

    try {
      const newImage = await generateImageFromPrompt(prompt);
      setImages(prev => [newImage, ...prev]);
    } catch (err) {
      setError("Failed to generate image. Please try again.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="py-6 px-4 md:px-8 flex items-center justify-between max-w-[1600px] mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-violet-600 to-blue-600 text-white p-2 rounded-lg shadow-lg">
            <Zap size={24} fill="currentColor" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            ImaginAI
          </h1>
        </div>
        <div className="text-sm font-medium text-gray-500 hidden sm:block">
          Powered by Gemini 2.5 Flash
        </div>
      </header>

      {/* Search Section */}
      <div className="pt-4 pb-6 sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 mb-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
            What do you want to create today?
          </h2>
          <SearchBar onGenerate={handleGenerate} isGenerating={isGenerating} />
        </div>
        
        {error && (
          <div className="max-w-md mx-auto mt-2 p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-center text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Main Content */}
      <main>
        <MasonryGrid 
          images={images} 
          onImageClick={setSelectedImage} 
        />
      </main>

      {/* Modal */}
      <Modal 
        image={selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />
    </div>
  );
};

export default App;
