import { Image, Send, X } from "lucide-react";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useChatStore } from "../store/useChatStore";

function MessageInput() {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const sendMessage = useChatStore(state => state.sendMessage);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="relative mb-3 w-fit">
          <img
            src={imagePreview}
            className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
          />

          <button
            onClick={removeImage}
            type="button"
            className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
          >
            <X className="size-3" />
          </button>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
        <input
          type="text"
          className="flex-1 input input-bordered rounded-lg input-md"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
        />

        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="btn btn-circle text-zinc-400"
        >
          <Image size={20} />
        </button>

        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="btn btn-sm btn-circle"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
