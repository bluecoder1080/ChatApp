interface ChatHeaderProps {
  roomName: string;
  isConnected: boolean;
  userCount: number;
}

const ChatHeader = ({ roomName, isConnected, userCount }: ChatHeaderProps) => {
  return (
    <div className="px-6 py-4 border-b border-gray-800">
      <h1 className="text-lg font-semibold text-white">Live Chat Room</h1>
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <span>Room: {roomName}</span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <span
            className={`w-2 h-2 rounded-full ${
              isConnected ? "bg-green-500" : "bg-red-500"
            }`}
          ></span>
          {isConnected ? "Connected" : "Disconnected"}
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          👥 {userCount} {userCount === 1 ? "user" : "users"}
        </span>
      </div>
    </div>
  );
};

export default ChatHeader;
