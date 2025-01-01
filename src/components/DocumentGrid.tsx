import React from 'react';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Document } from '../types/document';
import { DocumentCard } from './DocumentCard';

interface DocumentGridProps {
  documents: Document[];
  onImageClick: (document: Document) => void;
}

export function DocumentGrid({ documents, onImageClick }: DocumentGridProps) {
  return (
    <SortableContext 
      items={documents.map(doc => doc.position)} 
      strategy={rectSortingStrategy}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((document) => (
          <DocumentCard
            key={document.type}
            document={document}
            onImageClick={() => onImageClick(document)}
          />
        ))}
      </div>
    </SortableContext>
  );
}