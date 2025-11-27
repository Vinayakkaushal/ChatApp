import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { formatMessageTime } from "../lib/utils";

export default function ChatContainer() {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const bottomRef = useRef(null);

  // FETCH MESSAGES + SET SOCKET LISTENERS
  useEffect(() => {
    if (!selectedUser?._id) return;

    getMessages(selectedUser._id);

    // subscribe to messages only once per selected user
    subscribeToMessages();

    return () => {
      unsubscribeFromMessages();
    };
  }, [selectedUser?._id]);

  // SCROLL TO BOTTOM ON NEW MESSAGES
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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

      {/* MESSAGE LIST */}
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

            {/* BUBBLE */}
            <div
              className={`chat-bubble flex flex-col max-w-[250px] ${
                message.senderId === authUser._id
                  ? "chat-bubble-primary text-primary-content"
                  : "bg-base-200 text-base-content"
              }`}
            >
              {message.image && (
                <img
                  src={message.image}
                  className="rounded-md mb-2 max-w-[200px]"
                />
              )}

              {message.text && <p className="text-sm">{message.text}</p>}
            </div>
          </div>
        ))}

        {/* SCROLL ANCHOR */}
        <div ref={bottomRef} />
      </div>

      <MessageInput />
    </div>
  );
}
