import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { DocumentGrid } from './components/DocumentGrid';
import { ImageOverlay } from './components/ImageOverlay';
import { useDragAndDrop } from './hooks/useDragAndDrop';
import { Document } from './types/document';
import documentsData from './data/documents.json';

export default function App() {
  const [documents, setDocuments] = useState<Document[]>(documentsData.documents);
  const [selectedImage, setSelectedImage] = useState<Document | null>(null);
  const { sensors, handleDragEnd } = useDragAndDrop(documents, setDocuments);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Document Management System</h1>
        
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <DocumentGrid 
            documents={documents}
            onImageClick={setSelectedImage}
          />
        </DndContext>

        {selectedImage && (
          <ImageOverlay
            imageUrl={selectedImage.thumbnail}
            title={selectedImage.title}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </div>
    </div>
  );
}