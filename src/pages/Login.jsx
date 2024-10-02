import { useState } from "react";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, database } from "@/lib/firebase/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import upload from "@/lib/firebase/upload";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged In Successfully", {
        className: "bg-darkBlue text-white",
      });
    } catch (e) {
      console.error(e);
      toast.error(e.message, {
        className: "bg-darkBlue text-white",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);
    // VALIDATE INPUTS
    if (!username || !email || !password)
      return toast.warn("Please enter inputs!", {
        className: "bg-darkBlue text-white",
      });
    if (!avatar.file)
      return toast.warn("Please upload an avatar!", {
        className: "bg-darkBlue text-white",
      });

    // VALIDATE UNIQUE USERNAME
    const usersRef = collection(database, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return toast.warn("Select another username", {
        className: "bg-darkBlue text-white",
      });
    }
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(formData);

      const imageUrl = await upload(avatar.file);

      await setDoc(doc(database, "users", response.user.uid), {
        username,
        email,
        avatar: imageUrl,
        id: response.user.uid,
        blocked: [],
      });
      await setDoc(doc(database, "userchats", response.user.uid), {
        chats: [],
      });

      toast.success("Account Created Successfully", {
        className: "bg-darkBlue text-white",
      });
    } catch (e) {
      console.error(e);
      toast.error(e.message, {
        className: "bg-darkBlue text-white",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-full flex items-center gap-[100px]">
      <div className="flex-1 flex flex-col items-center gap-5">
        <h2 className="text-xl font-semibold">Welcome Back!</h2>
        <form
          className="flex flex-col items-center justify-center gap-5"
          onSubmit={handleLogin}
        >
          <input
            type="email"
            placeholder="Your email"
            name="email"
            className="formInput"
          />
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            className="formInput"
          />
          <button
            className="formButton disabled:btnDisabled"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login In"}
          </button>
        </form>
      </div>
      <div className="h-[80%] w-[2px] bg-[#dddddd35]"></div>
      <div className="flex-1 flex flex-col items-center gap-5">
        <h2 className="text-xl font-semibold">Create An Account!</h2>
        <form
          className="flex flex-col items-center justify-center gap-5"
          onSubmit={handleRegister}
        >
          <label
            htmlFor="file"
            className="w-full cursor-pointer flex items-center justify-between underline "
          >
            <img
              src={avatar.url || "./avatar.png"}
              alt="Avatar"
              className="w-[50px] h-[50px] rounded-lg object-cover opacity-60"
            />
            <span className="hover:text-lightGrey">Upload An Image</span>
          </label>
          <input
            type="file"
            id="file"
            name="image"
            className="hidden "
            onChange={handleAvatar}
          />
          <input
            type="text"
            placeholder="Your username"
            name="username"
            className="formInput"
          />
          <input
            type="email"
            placeholder="Your email"
            name="email"
            className="formInput"
          />
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            className="formInput"
          />
          <button
            className="formButton disabled:btnDisabled"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
