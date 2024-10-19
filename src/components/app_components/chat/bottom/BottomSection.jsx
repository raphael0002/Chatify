import { Button } from "@/components/ui/button";
import { Camera, ImagePlus, Mic, Send, SmilePlus } from "lucide-react";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { database } from "@/lib/firebase/firebase";
import { useChatStore } from "@/lib/firebase/chatStore";
import { useUserStore } from "@/lib/firebase/userStore";
import upload from "@/lib/firebase/upload";

const BottomSection = ({ image, setImage }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [message, setMessage] = useState("");

  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();
  const { currentUser } = useUserStore();

  // const handleClick = () => {
  //   setIsAnimating(true);
  //   setTimeout(() => setIsAnimating(false), 300); // Reset animation after 300ms
  //   // Here you would typically call a function to send the message
  //   console.log("Message sent!");
  // };

  const handleEmojiClick = (e) => {
    setMessage((prev) => prev + e.emoji);
    setEmojiOpen(false);
  };

  const handleImage = (e) => {
    if (e.target.files[0]) {
      setImage({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSend = async () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300); // Reset animation after 300ms
    // Here you would typically call a function to send the message
    console.log("Message sent!");
    if (!message) return;

    let imgUrl = null;

    try {
      if (image.file) {
        imgUrl = await upload(image.file);
      }

      await updateDoc(doc(database, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text: message,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      const userIds = [currentUser.id, user.id];

      userIds.forEach(async (id) => {
        const userChatRef = doc(database, "userchats", id);
        const userChatSnapshot = await getDoc(userChatRef);

        if (userChatSnapshot.exists()) {
          const userChatsData = userChatSnapshot.data();
          console.log(userChatsData);
          const chatIndex = userChatsData.chats.findIndex(
            (chat) => chat.chatId === chatId
          );
          console.log(chatIndex);
          if (chatIndex !== -1) {
            userChatsData.chats[chatIndex].lastMessage = message;
            userChatsData.chats[chatIndex].isSeen =
              id === currentUser.id ? true : false;
            userChatsData.chats[chatIndex].updatedAt = Date.now();

            await updateDoc(userChatRef, {
              chats: userChatsData.chats,
            });
          }
        }
      });
    } catch (e) {
      console.error(e);
    }

    setImage({
      file: null,
      url: "",
    });
    setMessage("");
  };
  return (
    <div className="p-5 flex items-center justify-between border-t border-borderColor gap-5 mt-auto">
      {isCurrentUserBlocked || isReceiverBlocked ? (
        <div className="text-lightGrey">You can not message this person</div>
      ) : (
        <>
          <div className="flex gap-5 *:cursor-pointer hover:*:text-lightGrey">
            <label htmlFor="file">
              <ImagePlus size={28} />
            </label>
            <input
              type="file"
              id="file"
              className="hidden"
              onChange={handleImage}
            />
            <Camera size={28} />
            <Mic size={28} />
          </div>
          <input
            type="text"
            value={message}
            placeholder="Type a message..."
            className="flex-1 border-none outline-none text-white bg-darkBlue rounded-md px-4 py-3 text-lg"
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="relative">
            <SmilePlus
              size={28}
              className="hover:text-lightGrey cursor-pointer"
              onClick={() => setEmojiOpen(!emojiOpen)}
            />
            <div className="absolute bottom-[70px] right-[-83px]">
              <EmojiPicker
                open={emojiOpen}
                onEmojiClick={handleEmojiClick}
                theme="dark"
              />
            </div>
          </div>
          <Button
            onClick={handleSend}
            className={`h-[52px] w-[52px] transition-transform duration-300 ease-in-out ${
              isAnimating ? "scale-95" : ""
            }`}
            size="icon"
          >
            <Send
              className={`h-6 w-6 ${
                isAnimating ? "translate-x-1 -translate-y-1" : ""
              }`}
            />
            <span className="sr-only">Send message</span>
          </Button>
        </>
      )}
    </div>
  );
};

export default BottomSection;
