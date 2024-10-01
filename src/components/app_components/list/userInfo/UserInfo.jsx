import { Edit, Ellipsis, Video } from "lucide-react";

const UserInfo = () => {
  return (
    <div className="p-5 flex items-center justify-between">
      <div className="flex items-center gap-5">
        <img
          src="./avatar.png"
          alt="Avatar"
          className="w-[50px] h-[50px] rounded-full object-cover"
        />
        <h2>Rohan Shrestha</h2>
      </div>
      <div className="flex gap-5 *:cursor-pointer">
        <Ellipsis size={24} />
        <Video size={24} />
        <Edit size={20} />
      </div>
    </div>
  );
};

export default UserInfo;
