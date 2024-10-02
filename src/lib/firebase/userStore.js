import { create } from "zustand";
import { database } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid) => {
    if (!uid) return set({ currentUser: null, isLoading: false });

    try {
      const docRef = doc(database, "users", uid);
      const res = await getDoc(docRef);

      if (res.exists()) {
        set({ currentUser: res.data(), isLoading: false });
      } else {
        set({ currentUser: null, isLoading: false });
      }
    } catch (e) {
      console.error(e);
      set({ currentUser: null, isLoading: false });
    }
  },
}));
