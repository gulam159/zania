import {
  useSensors,
  useSensor,
  KeyboardSensor,
  PointerSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import { Document } from "../types/document";

export function useDragAndDrop(
  _documents: Document[],
  setDocuments: (newDocuments: Document[]) => void
) {
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
      setDocuments((items: Document[]) => {
        const oldIndex = items.findIndex(
          (item: Document) => item.position === active.id
        );
        const newIndex = items.findIndex(
          (item: Document) => item.position === over.id
        );

        if (oldIndex === -1 || newIndex === -1) return items;

        const newItems = arrayMove(items, oldIndex, newIndex);
        return newItems.map((item: Document, index) => ({
          ...item,
          position: index,
        }));
      });
    }
  };

  return {
    sensors,
    handleDragEnd,
  };
}
