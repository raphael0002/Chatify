import { database } from "@/lib/firebase/firebase";
import { useUserStore } from "@/lib/firebase/userStore";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { toast } from "react-toastify";

const AddUser = () => {
  const [user, setUser] = useState(null);
  const { currentUser } = useUserStore();
  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(database, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setUser(querySnapshot.docs[0].data());
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAdd = async () => {
    const chatRef = collection(database, "chats");
    const userChatsRef = collection(database, "userchats");

    try {
      // Create a new chat document
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      // Check if user chat documents exist for both users
      const userChatDocRef = doc(userChatsRef, user.id);
      const currentUserChatDocRef = doc(userChatsRef, currentUser.id);
      const userChatSnap = await getDoc(userChatDocRef);
      const currentUserChatSnap = await getDoc(currentUserChatDocRef);

      // Create or update user chat document for the other user
      if (userChatSnap.exists()) {
        await updateDoc(userChatDocRef, {
          chats: arrayUnion({
            chatId: newChatRef.id,
            lastMessage: "",
            receiverId: currentUser.id,
            updatedAt: Date.now(),
          }),
        });
      } else {
        await setDoc(userChatDocRef, {
          chats: [
            {
              chatId: newChatRef.id,
              lastMessage: "",
              receiverId: currentUser.id,
              updatedAt: Date.now(),
            },
          ],
        });
      }

      // Create or update user chat document for the current user
      if (currentUserChatSnap.exists()) {
        await updateDoc(currentUserChatDocRef, {
          chats: arrayUnion({
            chatId: newChatRef.id,
            lastMessage: "",
            receiverId: user.id,
            updatedAt: Date.now(),
          }),
        });
      } else {
        await setDoc(currentUserChatDocRef, {
          chats: [
            {
              chatId: newChatRef.id,
              lastMessage: "",
              receiverId: user.id,
              updatedAt: Date.now(),
            },
          ],
        });
      }
    } catch (e) {
      console.error(e);
      toast.error(e.message);
    }
  };
  return (
    <div className="w-max h-max p-[30px] bg-[rgba(17,25,40,0.8)] rounded-lg absolute top-0 bottom-0 left-0 right-0 m-auto">
      <form className="flex gap-5" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="username"
          name="username"
          className="p-5 rounded-md border-none outline-none text-black"
        />
        <button className="formButton">Search</button>
      </form>
      {user && (
        <div className="mt-[30px] flex items-center justify-between">
          <div className="flex items-center gap-5">
            <img
              src={user.avatar || "./avatar.png"}
              alt="Avatar"
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <span>{user.username}</span>
          </div>
          <button
            className="py-2 px-3 rounded-md bg-[#1a73e8] text-white border-none cursor-pointer"
            onClick={handleAdd}
          >
            Add User
          </button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
