import { Minus, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import ChatListItems from "./ChatListItems/ChatListItems";
import AddUser from "../../addUser/AddUser";
import { useUserStore } from "@/lib/firebase/userStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { database } from "@/lib/firebase/firebase";

const ChatList = () => {
  const [addMode, setAddmode] = useState(false);
  const { currentUser } = useUserStore();
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const unSub = onSnapshot(
      doc(database, "userchats", currentUser.id),
      async (snapshot) => {
        const data = snapshot.data();

        // Check if data and chats exist
        if (!data || !data.chats) {
          console.error("No chats found or data is undefined");
          return;
        }

        const promises = data.chats.map(async (chatItem) => {
          const userDocRef = doc(database, "users", chatItem.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();
          return { ...chatItem, user };
        });

        const chatData = await Promise.all(promises);
        setChatList(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
        console.log("Current data: ", data);
      }
    );
    return () => {
      unSub();
    };
  }, [currentUser.id]);

  return (
    <div className="flex-1 overflow-scroll scroll-smooth">
      <div className="flex items-center gap-5 p-5">
        <div className="flex flex-1 items-center gap-5 rounded-md bg-darkBlue p-[10px]">
          <Search strokeWidth={3} size={20} />
          <input
            type="text"
            placeholder="Search"
            className="flex-1 bg-transparent border-none outline-none text-white"
          />
        </div>
        <div onClick={() => setAddmode(!addMode)}>
          {addMode ? (
            <Minus
              strokeWidth={3}
              className="bg-darkBlue h-[44px] w-[44px] p-[10px] rounded-md cursor-pointer"
            />
          ) : (
            <Plus
              strokeWidth={3}
              className="bg-darkBlue h-[44px] w-[44px] p-[10px] rounded-md cursor-pointer"
            />
          )}
        </div>
      </div>
      <div className={`itemsList`}>
        {chatList &&
          chatList.map((chat, i) => <ChatListItems key={i} chat={chat} />)}
      </div>
      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
