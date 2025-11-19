export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  createdAt: number;
  width?: number;
  height?: number;
}

export interface SearchBarProps {
  onGenerate: (prompt: string) => Promise<void>;
  isGenerating: boolean;
}

export interface MasonryGridProps {
  images: GeneratedImage[];
  onImageClick: (image: GeneratedImage) => void;
}

export interface ImageModalProps {
  image: GeneratedImage | null;
  onClose: () => void;
}
