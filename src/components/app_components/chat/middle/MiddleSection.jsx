import { useEffect, useRef, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { database } from "@/lib/firebase/firebase";
import { useChatStore } from "@/lib/firebase/chatStore";
import { useUserStore } from "@/lib/firebase/userStore";
import { format } from "timeago.js";
import { create } from "zustand";
const MiddleSection = ({ image }) => {
  const endRef = useRef(null);
  const { chatId } = useChatStore();
  const { currentUser } = useUserStore();
  const [chat, setChat] = useState();

  const [showMessageTime, setShowMessageTime] = useState({
    createdAt: null,
    state: false,
  });

  const handleShowMessageTime = (createdAt) => {
    setShowMessageTime({ createdAt, state: !showMessageTime.state });
  };
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(database, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => unSub();
  }, [chatId]);

  console.log(chat);
  return (
    <div className="Middle p-5 flex-1 overflow-y-scroll flex flex-col gap-5 ">
      <div className="empty"></div>
      {chat?.messages?.map((message) => (
        <div
          className={`${
            message.senderId === currentUser?.id ? "self-end" : "self-start"
          }`}
          key={message.createdAt}
        >
          {/* <div className="flex-1 flex flex-col gap-[5px]"> */}
          {message.img && (
            <img
              src={message.img}
              alt="Image"
              className={`w-full h-[300px] rounded-md object-cover ${
                message.senderId === currentUser?.id ? "self-end" : "self-start"
              }`}
            />
          )}
          <p
            className={`${
              message.senderId === currentUser?.id
                ? "bg-[#5183fe] "
                : "bg-[rgba(17,25,40,0.3)]"
            } p-3 rounded-md`}
            onClick={() => handleShowMessageTime(message.createdAt)}
          >
            {message.text}
          </p>
          {showMessageTime.state &&
            message.createdAt === showMessageTime.createdAt && (
              <span className="text-xs text-[rgba(255,255,255,0.4)]">
                {format(message.createdAt.toDate())}
              </span>
            )}
        </div>
        // </div>
      ))}
      {image.url && (
        <div className="self-end">
          <img
            src={image.url}
            alt="Image"
            className="w-full h-[300px] rounded-md object-cover"
          />
        </div>
      )}

      <div ref={endRef}></div>
    </div>
  );
};

export default MiddleSection;
