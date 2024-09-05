import { formatDistanceToNowStrict } from "date-fns";
import { id } from "date-fns/locale";

export const formatTime = (createdAt) => {
  const timeDiff = formatDistanceToNowStrict(new Date(createdAt), {
    addSuffix: true,
    locale: id,
  });

  if (timeDiff.includes("detik") || timeDiff.includes("second")) {
    return "Baru saja";
  }
  return timeDiff;
};
