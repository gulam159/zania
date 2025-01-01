import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ImageOverlayProps {
  imageUrl: string;
  title: string;
  onClose: () => void;
}

export function ImageOverlay({ imageUrl, title, onClose }: ImageOverlayProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="relative max-w-4xl w-full mx-4">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
        >
          <X className="w-8 h-8" />
        </button>
        <div className="bg-white rounded-lg overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-auto"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}