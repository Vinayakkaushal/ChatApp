import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { formatMessageTime } from "../lib/utils";

export default function ChatContainer() {
  const { messages, getMessages, isMessagesLoading, selectedUser } =
    useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser?._id]);

  if (isMessagesLoading)
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      {/* MESSAGES LIST */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
          >
            {/* AVATAR */}
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/exp.jpeg"
                      : selectedUser.profilePic || "/exp.jpeg"
                  }
                  alt=""
                />
              </div>
            </div>

            {/* TIME */}
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>

            {/* CHAT BUBBLE */}
            <div
              className={`chat-bubble flex flex-col max-w-[250px] ${
                message.senderId === authUser._id
                  ? "chat-bubble-primary text-primary-content"
                  : "bg-base-200 text-base-content"
              }`}
            >
              {/* IMAGE MESSAGE */}
              {message.image && (
                <img
                  src={message.image}
                  alt=""
                  className="rounded-md mb-2 max-w-[200px]"
                />
              )}

              {/* TEXT MESSAGE */}
              {message.text && (
                <p className="text-sm wrap-break-word">{message.text}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <MessageInput />
    </div>
  );
}
