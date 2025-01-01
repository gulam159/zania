import React, { useCallback, useEffect, useRef, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { DocumentGrid } from "./components/DocumentGrid";
import { ImageOverlay } from "./components/ImageOverlay";
import { useDragAndDrop } from "./hooks/useDragAndDrop";
import { Document } from "./types/document";
// import documentsData from './data/documents.json';
import { api } from "./lib/api";

export default function App() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedImage, setSelectedImage] = useState<Document | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const hasChanges = useRef(false);

  // Initial load
  useEffect(() => {
    api.getDocuments().then(setDocuments);
  }, []);

  // Save documents
  const saveDocuments = useCallback(async () => {
    if (!hasChanges.current) return;

    setIsSaving(true);
    try {
      await api.saveDocuments(documents);
      setLastSaved(new Date());
      hasChanges.current = false;
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setIsSaving(false);
    }
  }, [documents]);

  // Auto-save every 5 seconds
  useEffect(() => {
    const interval = setInterval(saveDocuments, 5000);
    return () => clearInterval(interval);
  }, [saveDocuments]);

  // Modified setDocuments to track changes
  const handleDocumentsChange = (newDocuments: Document[]) => {
    setDocuments(newDocuments);
    hasChanges.current = true;
  };

  const { sensors, handleDragEnd } = useDragAndDrop(
    documents,
    handleDocumentsChange
  );

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Document Management System
        </h1>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <DocumentGrid documents={documents} onImageClick={setSelectedImage} />
        </DndContext>

        {selectedImage && (
          <ImageOverlay
            imageUrl={selectedImage.thumbnail}
            title={selectedImage.title}
            onClose={() => setSelectedImage(null)}
          />
        )}

        {/* Saving indicator */}
        <div className="fixed bottom-4 right-4 text-sm bg-white rounded-md shadow-md p-3">
          {isSaving ? (
            <div className="flex items-center">
              <div className="animate-spin mr-2">⏳</div>
              Saving...
            </div>
          ) : lastSaved ? (
            <div>Last saved: {lastSaved.toLocaleTimeString()}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
