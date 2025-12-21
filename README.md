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
