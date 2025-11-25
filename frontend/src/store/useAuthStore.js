import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';
import { io } from "socket.io-client";

const BASE_URL= "http://localhost:5000"

export const useAuthStore = create((set , get) => ({
  authUser: null,
  onlineUsers :[],
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  socket:null,
  // CHECK AUTH
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket()
    } catch (error) {
      console.log("Error checking auth status", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // SIGNUP
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      toast.success("Signup successful!");
      set({ authUser: res.data });
      get().connectSocket()
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      set({ isSigningUp: false });
    }
  },

  // LOGIN (FIXED)
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      toast.success("Login successful!");
      set({ authUser: res.data });
      get().connectSocket()
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // LOGOUT
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed. Please try again.");
    }
  },

  // updateProfile
updateProfile: async (base64Image) => {
  set({ isUpdatingProfile: true });
  try {
    const res = await axiosInstance.put("/auth/update-profile", {
      profilePic: base64Image,   // <-- FIXED
    });

    set({ authUser: res.data });
    toast.success("Profile updated successfully!");
  } catch (error) {
    toast.error(error.response?.data?.message || "Profile update failed. Please try again.");
  } finally {
    set({ isUpdatingProfile: false });
  }
},

connectSocket : ()=>{
  const {authUser} = get()
  if (!authUser || get().socket?.connected) return;


  const socket = io(BASE_URL)
  socket.connect()
  set({socket :socket})
},
disconnectSocket : ()=>{
  if(get().socket?.connected) get().socket.disconnect();
}

}));
