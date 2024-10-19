import { useChatStore } from "@/lib/firebase/chatStore";
import { Info, Phone, Video } from "lucide-react";

const TopSection = () => {
  const { user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();
  return (
    <div className="Top p-5 flex items-center justify-between border-b border-borderColor">
      <div className="User flex items-center gap-5">
        <img
          src={
            (!isCurrentUserBlocked && !isReceiverBlocked && user?.avatar) ||
            "./avatar.png"
          }
          alt="avatar"
          className="w-[50px] h-[50px] rounded-full object-cover"
        />
        <div className="flex flex-col gap-1">
          <span className="text-lg leading-none font-bold">
            {isCurrentUserBlocked || isReceiverBlocked ? "User" : user.username}
          </span>
          <p className="text-[14px] font-medium text-lightGrey">Online</p>
        </div>
      </div>
      <div className="Icons flex gap-5 hover:*:text-lightGrey *:cursor-pointer">
        <Phone size={22} />
        <Video size={26} />
        <Info size={22} />
      </div>
    </div>
  );
};

export default TopSection;
