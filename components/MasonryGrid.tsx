import React from 'react';
import { GeneratedImage, MasonryGridProps } from '../types';
import { ImageCard } from './ImageCard';
import { Image } from 'lucide-react';

export const MasonryGrid: React.FC<MasonryGridProps> = ({ images, onImageClick }) => {
  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center opacity-0 animate-fade-in fill-mode-forwards" style={{animationDuration: '0.7s'}}>
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-300">
          <Image size={48} />
        </div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Your gallery is empty</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Use the search bar above to describe an image, and AI will generate it for you instantly.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 pb-20">
      {/* Masonry Layout using CSS Columns */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
        {images.map((img) => (
          <div key={img.id} className="break-inside-avoid">
             <ImageCard image={img} onClick={() => onImageClick(img)} />
          </div>
        ))}
      </div>
    </div>
  );
};
