const ChatListItems = ({ chat, handleSelect }) => {
  return (
    <div
      className={`flex items-center gap-5 p-5 border-b border-borderColor cursor-pointer mx-3 ${
        chat?.isSeen ? "bg-transparent" : "bg-[#5183fe]"
      }`}
      onClick={() => handleSelect(chat)}
    >
      <img
        src={chat.user.avatar || "./avatar.png"}
        alt="avatar"
        className="w-[50px] h-[50px] rounded-full object-cover"
      />
      <div className="flex flex-col gap-[10px]">
        <span className="font-bold">{chat.user.username}</span>
        <p className="text-sm leading-none font-medium">{chat.lastMessage}</p>
      </div>
    </div>
  );
};

export default ChatListItems;
