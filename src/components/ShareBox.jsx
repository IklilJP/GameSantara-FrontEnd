import { motion } from "framer-motion";
import {
  FacebookShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from "react-share";
import { FaFacebook, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { HiLink } from "react-icons/hi";

const ShareBox = ({ id, shareRef }) => {
  const handleCopy = (event, url) => {
    event.preventDefault();
    event.stopPropagation();
    navigator.clipboard.writeText(url);
  };

  return (
    <div
      ref={shareRef}
      className="w-36 max-w-40 bg-black absolute bottom-10 left-0 border border-colorBorder rounded-lg overflow-hidden z-10">
      <TelegramShareButton
        className="w-36"
        url={`https://example.com/posts/${id}`}>
        <div className="flex items-center gap-3 py-2 px-3 hover:bg-gray-700 transition">
          <FaTelegram color="#2AABEE " />
          Telegram
        </div>
      </TelegramShareButton>
      <FacebookShareButton
        className="w-36"
        url={`https://example.com/posts/${id}`}>
        <div className="flex items-center gap-3 py-2 px-3 hover:bg-gray-700 transition">
          <FaFacebook color="#3b5998" />
          Facebook
        </div>
      </FacebookShareButton>
      <WhatsappShareButton
        className="w-36"
        url={`https://example.com/posts/${id}`}>
        <div className="flex items-center gap-3 py-2 px-3 hover:bg-gray-700 transition">
          <FaWhatsapp color="#25D366" />
          WhatsApp
        </div>
      </WhatsappShareButton>
      <button
        className="w-36"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        onClick={(e) => handleCopy(e, `https://example.com/posts/${id}`)}>
        <div className="flex items-center gap-3 py-2 px-3 hover:bg-gray-700 transition">
          <HiLink className="text-yellow-500" /> Salin Link
        </div>
      </button>
    </div>
  );
};

export default ShareBox;
