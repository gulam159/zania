import { Document } from "../types/document";

const fallbackData = [
  {
    type: "bank-draft",
    title: "Bank Draft",
    position: 0,
    thumbnail:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    type: "bill-of-lading",
    title: "Bill of Lading",
    position: 1,
    thumbnail:
      "https://images.unsplash.com/photo-1568234928966-359c35dd8327?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    type: "invoice",
    title: "Invoice",
    position: 2,
    thumbnail:
      "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    type: "bank-draft-2",
    title: "Bank Draft 2",
    position: 3,
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    type: "bill-of-lading-2",
    title: "Bill of Lading 2",
    position: 4,
    thumbnail:
      "https://images.unsplash.com/photo-1586527155314-1d25428324ff?auto=format&fit=crop&q=80&w=300&h=200",
  },
];

const STORAGE_KEY = "documents";

const getStoredData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error reading from localStorage:", error);
  }
  // If no stored data or error, return fallback data
  return fallbackData;
};

export const api = {
  getDocuments: async (): Promise<Document[]> => {
    // In production, directly use localStorage/fallback
    if (process.env.NODE_ENV === "production") {
      return getStoredData();
    }

    // In development, try the API first
    try {
      const response = await fetch("/api/documents");
      if (!response.ok) throw new Error("API request failed");
      return response.json();
    } catch (error) {
      console.warn("API request failed, using fallback:", error);
      return getStoredData();
    }
  },

  saveDocuments: async (
    documents: Document[]
  ): Promise<{ success: boolean }> => {
    // In production, save directly to localStorage
    if (process.env.NODE_ENV === "production") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
      return { success: true };
    }

    // In development, try the API first
    try {
      const response = await fetch("/api/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(documents),
      });
      if (!response.ok) throw new Error("API request failed");
      return response.json();
    } catch (error) {
      console.warn("API save failed, using localStorage:", error);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
      return { success: true };
    }
  },

  updateDocument: async (
    id: string,
    updates: Partial<Document>
  ): Promise<Document> => {
    const response = await fetch(`/api/documents/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error("Failed to update document");
    return response.json();
  },

  deleteDocument: async (id: string): Promise<void> => {
    const response = await fetch(`/api/documents/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete document");
  },

  updatePositions: async (documents: Document[]): Promise<Document[]> => {
    const response = await fetch("/api/documents/positions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(documents),
    });
    if (!response.ok) throw new Error("Failed to update positions");
    return response.json();
  },
};
