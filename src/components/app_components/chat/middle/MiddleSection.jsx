import { useEffect, useRef } from "react";

const MiddleSection = () => {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <div className="Middle p-5 flex-1 overflow-y-scroll flex flex-col gap-5 ">
      <div className="message">
        <img
          src="./avatar.png"
          alt="Avatar"
          className="w-[35px] h-[35px] rounded-full object-cover"
        />
        <div className="flex-1 flex flex-col gap-[5px]">
          <p className="bg-[rgba(17,25,40,0.3)] p-3 rounded-md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est eaque
            quod iste deserunt delectus. Quisquam, porro iste ipsa vitae
            necessitatibus numquam inventore nisi. Consequatur optio beatae
            alias nisi, repellendus velit.
          </p>
          <span className="text-sm">1 min ago.</span>
        </div>
      </div>
      <div className="message own">
        <div className="flex-1 flex flex-col gap-[5px]">
          <img
            src="https://github.com/ealush/emoji-picker-react/assets/11255103/c28cc954-dc1d-4d82-91a8-64a74cf1d598"
            alt=""
            className="w-full h-[300px] rounded-md object-cover"
          />
          <p className="bg-[#5183fe] p-3 rounded-md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est eaque
            quod iste deserunt delectus. Quisquam, porro iste ipsa vitae
            necessitatibus numquam inventore nisi. Consequatur optio beatae
            alias nisi, repellendus velit.
          </p>
          <span className="text-sm">1 min ago.</span>
        </div>
      </div>
      <div className="message own">
        <div className="flex-1 flex flex-col gap-[5px]">
          <img
            src="https://github.com/ealush/emoji-picker-react/assets/11255103/c28cc954-dc1d-4d82-91a8-64a74cf1d598"
            alt=""
            className="w-full h-[300px] rounded-md object-cover"
          />
          <p className="bg-[#5183fe] p-3 rounded-md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est eaque
            quod iste deserunt delectus. Quisquam, porro iste ipsa vitae
            necessitatibus numquam inventore nisi. Consequatur optio beatae
            alias nisi, repellendus velit.
          </p>
          <span className="text-sm">1 min ago.</span>
        </div>
      </div>
      <div ref={endRef}></div>
    </div>
  );
};

export default MiddleSection;
