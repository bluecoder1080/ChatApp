# Live Chat App

A real-time chat application built with WebSocket, React, TypeScript, and Tailwind CSS.

![Front Page](./frontend/public/Front_Page.png)

## Features

- 💬 **Real-time messaging** - Instant message delivery using WebSocket
- 🚪 **Room-based chat** - Create or join rooms to chat with specific groups
- 👥 **User count** - See how many users are in the room
- ✍️ **Typing indicators** - Know when someone is typing
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- ⚡ **Lightweight** - Minimal dependencies, fast performance

### Typing Feature in Action

![Typing Feature](./frontend/public/Typing_Feature.png)

## Tech Stack

**Frontend:**

- React 18
- TypeScript
- Tailwind CSS
- WebSocket API

**Backend:**

- Node.js
- WebSocket (ws library)
- TypeScript

## Getting Started

### Prerequisites

- Node.js (v20+)
- npm

### Installation

git clone https://github.com/bluecoder1080/ChatApp.git
cd ChatApp

```
## Interview Q&A

The interview questions and answers have been moved to a dedicated file: [README-interview.md](README-interview.md)
│   │   ├── components/
│   │   │   ├── ChatHeader.tsx
│   │   │   ├── MessageList.tsx
│   │   │   └── MessageInput.tsx
│   │   ├── App.tsx           # Main component
│   │   ├── App.css
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## Features Breakdown

### WebSocket Events

- `join` - User joins a room
- `chat` - User sends a message
- `typing` - User typing status
- `userCount` - Broadcast current user count

### Components

- **App.tsx** - Main application logic and state management
- **ChatHeader** - Shows room info, connection status, and user count
- **MessageList** - Displays messages and typing indicator
- **MessageInput** - Input field with typing detection

## License

MIT

## Author

**Made by Aditya**

Built with ❤️ using React and WebSocket

## Environment Variables

- **Backend `PORT`:** In production (Render), `PORT` is provided automatically. For local development, copy `backend/.env.example` to `backend/.env` and set `PORT=8080` (or your preferred port). Env vars are available via `process.env` in the code.
- **Render Dashboard:** Go to your service → Environment → Add Environment Variable. You can also use "Add from .env" to bulk import a local `.env` file. The repo includes `backend/.env.example` for safe sharing; do not commit real secrets.
- **Configuration-as-code:** `render.yaml` supports `envVars`. This project sets `NODE_ENV=production` there; you can add more keys as needed.

### Quick Commands

```
# Install backend deps and build
npm install --prefix backend && npm run --prefix backend build

# Local dev: use .env
copy backend\.env.example backend\.env
npm run --prefix backend start
```

### Frontend WebSocket URL

- Set `VITE_WS_URL` to your deployed backend WebSocket URL (use `wss://` for HTTPS):

```
copy frontend\.env.example frontend\.env
# If deploying elsewhere, edit VITE_WS_URL accordingly
```

- Current default in `.env.example` points to: `wss://chatapp-backend-l53l.onrender.com/`
- For Render Static Site, define `VITE_WS_URL` in the service Environment tab before building; Vite reads env at build time.
