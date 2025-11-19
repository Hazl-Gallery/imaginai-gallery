import React from 'react';
import { GeneratedImage } from '../types';
import { Maximize2 } from 'lucide-react';

interface ImageCardProps {
  image: GeneratedImage;
  onClick: () => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  return (
    <div 
      className="group relative rounded-2xl overflow-hidden cursor-zoom-in mb-4 shadow-sm hover:shadow-xl transition-shadow duration-300 bg-gray-200"
      onClick={onClick}
    >
      <img 
        src={image.url} 
        alt={image.prompt}
        loading="lazy"
        className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
      />
      
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white text-sm font-medium line-clamp-2 drop-shadow-md">
            {image.prompt}
          </p>
          <button className="mt-2 flex items-center gap-1 text-xs text-white/80 hover:text-white">
            <Maximize2 size={12} />
            <span>View details</span>
          </button>
        </div>
      </div>
    </div>
  );
};
