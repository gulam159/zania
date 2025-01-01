import { useSensors, useSensor, KeyboardSensor, PointerSensor, DragEndEvent } from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';
import { Document } from '../types/document';

export function useDragAndDrop(documents: Document[], setDocuments: (docs: Document[]) => void) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Reduced distance for easier activation
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setDocuments((items) => {
        const oldIndex = items.findIndex((item) => item.position === active.id);
        const newIndex = items.findIndex((item) => item.position === over.id);
        
        if (oldIndex === -1 || newIndex === -1) return items;
        
        const newItems = arrayMove(items, oldIndex, newIndex);
        // Update positions after moving
        return newItems.map((item, index) => ({
          ...item,
          position: index
        }));
      });
    }
  };

  return {
    sensors,
    handleDragEnd,
  };
}