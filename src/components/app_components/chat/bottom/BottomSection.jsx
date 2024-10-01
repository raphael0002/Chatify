import { Button } from "@/components/ui/button";
import { Camera, ImagePlus, Mic, Send, SmilePlus } from "lucide-react";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";

const BottomSection = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300); // Reset animation after 300ms
    // Here you would typically call a function to send the message
    console.log("Message sent!");
  };

  const handleEmojiClick = (e) => {
    setMessage((prev) => prev + e.emoji);
    setEmojiOpen(false);
  };
  return (
    <div className="p-5 flex items-center justify-between border-t border-borderColor gap-5 mt-auto">
      <div className="flex gap-5 *:cursor-pointer hover:*:text-lightGrey">
        <ImagePlus size={28} />
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
        onClick={handleClick}
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
    </div>
  );
};

export default BottomSection;
