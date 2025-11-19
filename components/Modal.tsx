import React, { useEffect } from 'react';
import { X, Download, Calendar, Type } from 'lucide-react';
import { ImageModalProps } from '../types';

export const Modal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    // Prevent background scrolling
    if (image) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [image, onClose]);

  if (!image) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `ai-generated-${image.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row animate-scale-in">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors backdrop-blur-md"
        >
          <X size={20} />
        </button>

        {/* Image Side */}
        <div className="w-full md:w-2/3 bg-gray-100 flex items-center justify-center p-4 md:p-8 overflow-auto no-scrollbar bg-pattern">
          <img 
            src={image.url} 
            alt={image.prompt} 
            className="max-w-full max-h-[60vh] md:max-h-[80vh] rounded-lg shadow-lg object-contain"
          />
        </div>

        {/* Info Side */}
        <div className="w-full md:w-1/3 p-6 md:p-8 flex flex-col bg-white">
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Image Details</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-2">
                  <Type size={16} />
                  <span>Prompt</span>
                </div>
                <p className="text-gray-800 text-lg leading-relaxed border-l-4 border-violet-500 pl-4 bg-gray-50 p-3 rounded-r-lg italic">
                  "{image.prompt}"
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-2">
                  <Calendar size={16} />
                  <span>Generated</span>
                </div>
                <p className="text-gray-800">
                  {new Date(image.createdAt).toLocaleString(undefined, { 
                    dateStyle: 'medium', 
                    timeStyle: 'short' 
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <button 
              onClick={handleDownload}
              className="w-full py-3 px-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <Download size={18} />
              Download Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
