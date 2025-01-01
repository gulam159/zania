# Document Management System

A React-based document management system with drag-and-drop functionality and automatic saving.

## Features

- 📱 Responsive grid layout
- 🖱️ Drag and drop reordering
- 🖼️ Image preview overlay
- 💾 Automatic saving
- 🔄 Loading states and indicators

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- DND Kit (drag and drop)
- MSW (API mocking)
- Docker

## Project Structure

```
src/
├── components/ # React components
├── hooks/      # Custom React hooks
├── lib/        # Utilities and API
├── mocks/      # MSW mock service
├── types/      # TypeScript types
└── App.tsx     # Main application
```

## Getting Started

### Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

### Production (Docker)

1. Build and start the container:
   ```bash
   docker-compose up -d
   ```

2. Access the application at `http://localhost`

## Architecture Overview

### Frontend Architecture

The application follows a component-based architecture with React:

- **App.tsx**: Main component handling state management and layout
- **DocumentGrid**: Manages the grid display and drag-and-drop functionality
- **DocumentCard**: Individual document display with loading states
- **ImageOverlay**: Modal for displaying enlarged images

### State Management

- Uses React's built-in state management with hooks
- `useRef` for tracking changes without triggering re-renders
- Automatic saving implemented with `useEffect` and `setInterval`

### API Design

The application uses a RESTful API with two main endpoints:

```typescript
GET /api/documents
// Returns array of documents
// No parameters required
// Response: Document[]

POST /api/documents
// Saves updated document array
// Body: Document[]
// Response: { success: boolean }
```

### Data Persistence

In development:
- Uses MSW (Mock Service Worker) to intercept API calls
- Data persisted in localStorage
- Automatic saving every 5 seconds when changes detected

## Future Improvements

1. Add document creation/deletion functionality
2. Implement user authentication
3. Add search and filtering capabilities
4. Implement real-time collaboration
5. Add image upload functionality

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Deployment

To deploy the application:

Make sure Docker and Docker Compose are installed on your system. Then, build and start the containers:

```bash
docker-compose up -d
```

The application will be available at [http://localhost](http://localhost)
