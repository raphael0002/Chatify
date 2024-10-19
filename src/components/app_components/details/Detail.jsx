import { useChatStore } from "@/lib/firebase/chatStore";
import { database } from "@/lib/firebase/firebase";
import { useUserStore } from "@/lib/firebase/userStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { Download } from "lucide-react";

const Detail = () => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =
    useChatStore();
  const { currentUser } = useUserStore();
  const handleBlock = async () => {
    if (!user) return;
    const userDocRef = doc(database, "users", currentUser.id);
    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="flex-1">
      <div className="py-[30px] px-5 flex flex-col items-center gap-3 border-b border-borderColor">
        <img
          src={
            (!isCurrentUserBlocked && !isReceiverBlocked && user?.avatar) ||
            "./avatar.png"
          }
          alt="Avatar"
          className="w-[100px] h-[100px] rounded-full object-cover"
        />
        <h2>
          {isCurrentUserBlocked || isReceiverBlocked ? "User" : user.username}
        </h2>
        <p>Online</p>
      </div>
      <div className="p-5 flex flex-col gap-[25px]">
        {!isCurrentUserBlocked && !isReceiverBlocked && (
          <>
            <div className="option">
              <div className="flex items-center justify-between">
                <span>Chat Settings</span>
                <img
                  src="./arrowUp.png"
                  alt=""
                  className="w-[30px] h-[30px] p-[10px] bg-[rgba(17,25,40,0.3)] rounded-full cursor-pointer"
                />
              </div>
            </div>
            <div className="option">
              <div className="flex items-center justify-between">
                <span>Privacy & Help</span>
                <img
                  src="./arrowUp.png"
                  alt=""
                  className="w-[30px] h-[30px] p-[10px] bg-[rgba(17,25,40,0.3)] rounded-full cursor-pointer"
                />
              </div>
            </div>
            <div className="option">
              <div className="flex items-center justify-between gap-5">
                <span>Shared Photos</span>
                <img
                  src="./arrowDown.png"
                  alt=""
                  className="w-[30px] h-[30px] p-[10px] bg-[rgba(17,25,40,0.3)] rounded-full cursor-pointer"
                />
              </div>
              <div className="flex flex-col gap-5 mt-5">
                <div className="flex items-center justify-between gap-5 ">
                  <div className="flex items-center gap-5">
                    <img
                      src="https://github.com/ealush/emoji-picker-react/assets/11255103/c28cc954-dc1d-4d82-91a8-64a74cf1d598"
                      alt="Photo"
                      className="w-10 h-10 border-[5px] object-cover"
                    />
                    <span className="text-sm text-lightGrey font-medium">
                      photo.png
                    </span>
                  </div>

                  <Download size={24} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <img
                      src="https://github.com/ealush/emoji-picker-react/assets/11255103/c28cc954-dc1d-4d82-91a8-64a74cf1d598"
                      alt="Photo"
                      className="w-10 h-10 border-[5px] object-cover"
                    />
                    <span className="text-sm text-lightGrey font-medium">
                      photo.png
                    </span>
                  </div>

                  <Download size={24} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <img
                      src="https://github.com/ealush/emoji-picker-react/assets/11255103/c28cc954-dc1d-4d82-91a8-64a74cf1d598"
                      alt="Photo"
                      className="w-10 h-10 border-[5px] object-cover"
                    />
                    <span className="text-sm text-lightGrey font-medium">
                      photo.png
                    </span>
                  </div>

                  <Download size={24} />
                </div>
              </div>
            </div>
            <div className="option">
              <div className="flex items-center justify-between">
                <span>Shared Files</span>
                <img
                  src="./arrowUp.png"
                  alt=""
                  className="w-[30px] h-[30px] p-[10px] bg-[rgba(17,25,40,0.3)] rounded-full cursor-pointer"
                />
              </div>
            </div>
          </>
        )}
        <button
          className="py-[10px] px-5 bg-[rgba(230,74,105,0.553)] text-white border-none rounded-md cursor-pointer hover:bg-[rgba(220,20,60,0.796)] transition-all"
          onClick={handleBlock}
        >
          {isCurrentUserBlocked
            ? "You are Blocked"
            : isReceiverBlocked
            ? "User Blocked"
            : "Block User"}
        </button>
      </div>
    </div>
  );
};

export default Detail;
