import { Minus, Plus, Search } from "lucide-react";
import { useState } from "react";
import ChatListItems from "./ChatListItems/ChatListItems";

const ChatList = () => {
  const [addMode, setAddmode] = useState(false);
  return (
    <div className="flex-1 overflow-scroll scroll-smooth">
      <div className=" flex items-center gap-5 p-5">
        <div className="flex flex-1 items-center gap-5 rounded-md bg-darkBlue p-[10px]">
          <Search stroke-width={3} size={20} />
          <input
            type="text"
            placeholder="Search"
            className="flex-1 bg-transparent border-none outline-none text-white"
          />
        </div>
        <div onClick={() => setAddmode(!addMode)}>
          {addMode ? (
            <Plus
              stroke-width={3}
              className="bg-darkBlue h-[44px] w-[44px] p-[10px] rounded-md cursor-pointer"
            />
          ) : (
            <Minus
              stroke-width={3}
              className="bg-darkBlue h-[44px] w-[44px] p-[10px] rounded-md cursor-pointer"
            />
          )}
        </div>
      </div>
      <div className={`itemsList `}>
        <ChatListItems />
      </div>
    </div>
  );
};

export default ChatList;
