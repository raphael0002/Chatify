import Chat from "@/components/app_components/chat/Chat";
import Detail from "@/components/app_components/details/Detail";
import List from "@/components/app_components/list/List";

const HomePage = () => {
  return (
    <div
      className="
  w-[98vw] h-[96vh] bg-[rgba(17,25,40,0.75)] rounded-md backdrop-blur-lg backdrop-saturate-[180%] border border-white border-opacity-[0.125] flex"
    >
      <List />
      <Chat />
      <Detail />
    </div>
  );
};

export default HomePage;
