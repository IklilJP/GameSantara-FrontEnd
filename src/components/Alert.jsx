import { motion } from "framer-motion";

const Alert = ({ isError, isSuccess }) => {
  const message = isSuccess || isError;
  const alertType = isSuccess ? "success" : "error";

  const alertStyles = {
    success: "text-blue-500 border-blue-500",
    error: "text-red-600 border-red-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-20 left-0 right-0 max-w-md mx-auto">
      <div
        className={`flex items-center p-4 mb-4 text-sm border rounded-lg bg-softBlack ${alertStyles[alertType]}`}
        role="alert">
        <svg
          className="flex-shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">{alertType}</span>
        <div>{message}</div>
      </div>
    </motion.div>
  );
};

export default Alert;
