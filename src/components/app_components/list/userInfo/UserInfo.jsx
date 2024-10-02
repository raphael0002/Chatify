import HoverPopUpLogOut from "@/components/ui/HoverPopUpLogOut";
import { useUserStore } from "@/lib/firebase/userStore";
import { Edit, Video } from "lucide-react";

const UserInfo = () => {
  const { currentUser } = useUserStore();
  return (
    <div className="p-5 flex items-center justify-between">
      <div className="flex items-center gap-5">
        <img
          src={currentUser.avatar}
          alt="Avatar"
          className="w-[50px] h-[50px] rounded-full object-cover"
        />
        <h2>{currentUser.username}</h2>
      </div>
      <div className="flex justify-center items-center gap-5 *:cursor-pointer hover:*:text-lightGrey">
        <HoverPopUpLogOut />
        <Video size={24} />
        <Edit size={20} />
      </div>
    </div>
  );
};

export default UserInfo;
