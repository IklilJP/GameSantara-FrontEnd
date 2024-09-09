import { motion } from "framer-motion";
import {
  FacebookShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from "react-share";
import { FaFacebook, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { HiLink } from "react-icons/hi";
import CopyToClipboard from "react-copy-to-clipboard";

const ShareBox = ({ id, shareRef }) => {
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
      <CopyToClipboard text={`https://example.com/posts/${id}`}>
        <div className="flex items-center gap-3 py-2 px-3 hover:bg-gray-700 transition">
          <HiLink className="text-yellow-500" /> Salin Link
        </div>
      </CopyToClipboard>
    </div>
  );
};

export default ShareBox;
