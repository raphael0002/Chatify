const ChatListItems = () => {
  return (
    <div className="flex items-center gap-5 p-5 border-b border-borderColor cursor-pointer mx-3">
      <img
        src="./avatar.png"
        alt="avatar"
        className="w-[50px] h-[50px] rounded-full object-cover"
      />
      <div className="flex flex-col gap-[10px]">
        <span className="font-bold">Rohan Shrestha</span>
        <p className="text-sm leading-none font-medium">Hello</p>
      </div>
    </div>
  );
};

export default ChatListItems;
