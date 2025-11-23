import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

function ProfilePage() {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage , setSelectedImage] = useState(null);

const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onloadend = async () => {
    const base64Image = reader.result;

    // instant preview
    setSelectedImage(base64Image);

    // Send ONLY the base64Image (not object!)
    await updateProfile(base64Image);
  };

  reader.readAsDataURL(file);
};



  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-200 rounded-xl p-6 space-y-8">

          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* Profile Image */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImage || authUser.profilePic || "/avatar.png"}
                alt=""
                className="size-32 rounded-full object-cover border-4"
              />

              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-1 right-1 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-300 ${
                  isUpdatingProfile ? "animate-pulse" : ""
                }`}
              >
                <Camera className="w-5 h-5 text-base-200" />

                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>

            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Updating..." : "Change Profile Picture"}
            </p>
          </div>

          {/* User Info */}
          <div className="space-y-6">
            {/* Full Name */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.fullName}
              </p>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Account Information */}
          <div className="w-full bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>

            <div className="space-y-3 text-sm">

              {/* Member Since */}
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser?.createdAt?.split("T")[0]}</span>
              </div>

              {/* Account Status */}
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
