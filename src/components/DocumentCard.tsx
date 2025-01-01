import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripHorizontal, Image as ImageIcon } from 'lucide-react';
import { Document } from '../types/document';

interface DocumentCardProps {
  document: Document;
  onImageClick: () => void;
}

export function DocumentCard({ document, onImageClick }: DocumentCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: document.position,
    data: document
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 2 : 1,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab'
  };

  const [isImageLoaded, setIsImageLoaded] = React.useState(false);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg"
    >
      <div className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white/90 transition-colors">
        <GripHorizontal className="w-5 h-5 text-gray-600" />
      </div>
      
      <div className="relative aspect-[3/2] bg-gray-100">
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}
        <img
          src={document.thumbnail}
          alt={document.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsImageLoaded(true)}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onImageClick();
          }}
          className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-colors group"
        >
          <ImageIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-gray-900">{document.title}</h3>
        <p className="text-sm text-gray-500 mt-1">Type: {document.type}</p>
      </div>
    </div>
  );
}