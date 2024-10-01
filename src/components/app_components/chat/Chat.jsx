import BottomSection from "./bottom/BottomSection";
import MiddleSection from "./middle/MiddleSection";
import TopSection from "./top/TopSection";

const Chat = () => {
  return (
    <div className="flex flex-col flex-[2] border-l border-r border-borderColor h-full">
      <TopSection />
      <MiddleSection />
      <BottomSection />
    </div>
  );
};

export default Chat;
