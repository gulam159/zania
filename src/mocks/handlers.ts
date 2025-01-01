import { http, HttpResponse } from "msw";

// Your initial data
const initialData = [
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

// Store data in localStorage
const STORAGE_KEY = "documents";
const getStoredData = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
  return JSON.parse(stored);
};

export const handlers = [
  // GET documents
  http.get("/api/documents", () => {
    return HttpResponse.json(getStoredData());
  }),

  // POST to save documents
  http.post("/api/documents", async ({ request }) => {
    const documents = await request.json();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
    return HttpResponse.json({ success: true });
  }),
];
