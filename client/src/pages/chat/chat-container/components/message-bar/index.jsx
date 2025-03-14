import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";

const MessageBar = () => {
  const [message, setMessage] = useState();
  const emojiRef = useRef();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleAddEmoji = (emoji) => {
    setMessage(message + emoji.emoji);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);

  const handleSendMesssage = async () => {};
  return (
    <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6">
      <div className="flex flex-1 bg-[#2a2b33] rounded-md items-center gap-5 pr-5 ">
        <input
          type="text"
          className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
          placeholder="Enter Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="text-neutral-500 focus:border-none focus:outline-none hover:text-white duration-300 transition-all">
          <GrAttachment className="text-2xl" />
        </button>
        <div className="relative">
          <button
            onClick={() => setShowEmojiPicker(true)}
            className="text-neutral-500 focus:border-none focus:outline-none hover:text-white duration-300 transition-all"
          >
            <RiEmojiStickerLine className="text-2xl" />
          </button>
          <div ref={emojiRef} className="absolute bottom-16 right-0">
            <EmojiPicker
              theme="dark"
              open={showEmojiPicker}
              onEmojiClick={handleAddEmoji}
              autoFocusSearch={false}
            />
          </div>
        </div>
      </div>
      <button
        onClick={handleSendMesssage}
        className="bg-[#8417ff] rounded-md flex items-center justify-center p-5 focus:border-none focus:outline-none hover:bg-[#741bda] focus:bg-[#741bda] focus:text-white duration-300 transition-all "
      >
        <IoSend className="text-2xl" />
      </button>
    </div>
  );
};

export default MessageBar;
