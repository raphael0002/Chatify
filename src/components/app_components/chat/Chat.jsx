import { useState } from "react";
import BottomSection from "./bottom/BottomSection";
import MiddleSection from "./middle/MiddleSection";
import TopSection from "./top/TopSection";

const Chat = () => {
  const [image, setImage] = useState({
    file: null,
    url: "",
  });
  return (
    <div className="flex flex-col flex-[2] border-l border-r border-borderColor h-full">
      <TopSection />
      <MiddleSection image={image} />
      <BottomSection image={image} setImage={setImage} />
    </div>
  );
};

export default Chat;
