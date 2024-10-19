import Chat from "@/components/app_components/chat/Chat";
import Detail from "@/components/app_components/details/Detail";
import List from "@/components/app_components/list/List";
import Login from "./Login";
import Notification from "@/components/app_components/notification/Notification";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { useUserStore } from "@/lib/firebase/userStore";
import { PacmanLoader } from "react-spinners";
import { useChatStore } from "@/lib/firebase/chatStore";

const HomePage = () => {
  const { chatId } = useChatStore();
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });
    return () => unSub();
  }, [fetchUserInfo]);

  if (isLoading) return <PacmanLoader color="orange" />;
  return (
    <div
      className="
  w-[98vw] h-[96vh] bg-[rgba(17,25,40,0.75)] rounded-md backdrop-blur-lg backdrop-saturate-[180%] border border-white border-opacity-[0.125] flex"
    >
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default HomePage;
