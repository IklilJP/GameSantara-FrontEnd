import axiosInstance from "./axiosInstance";

export const handleUpvote = async (
  event,
  setPosts,
  setIsError,
  postId,
  isUpVoted,
  isDownVoted,
  userLogin,
) => {
  event.preventDefault();
  event.stopPropagation();

  if (!userLogin) {
    setIsError("Silahkan login terlebih dahulu");
    return;
  }
  try {
    const response = await axiosInstance.post(`/vote-posts/${postId}/up-vote`);
    if (response.status === 200) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                upVotesCount: isUpVoted
                  ? post.upVotesCount - 1
                  : post.upVotesCount + 1,
                isUpVoted: !isUpVoted,
                downVotesCount: isDownVoted
                  ? post.downVotesCount - 1
                  : post.downVotesCount,
                isDownVoted: false,
              }
            : post,
        ),
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleDownvote = async (
  event,
  setPosts,
  setIsError,
  postId,
  isDownVoted,
  isUpVoted,
  userLogin,
) => {
  event.preventDefault();
  event.stopPropagation();

  if (!userLogin) {
    setIsError("Silahkan login terlebih dahulu");
    return;
  }

  try {
    const response = await axiosInstance.post(
      `/vote-posts/${postId}/down-vote`,
    );
    if (response.status === 200) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                downVotesCount: isDownVoted
                  ? post.downVotesCount - 1
                  : post.downVotesCount + 1,
                isDownVoted: !isDownVoted,
                upVotesCount: isUpVoted
                  ? post.upVotesCount - 1
                  : post.upVotesCount,
                isUpVoted: false,
              }
            : post,
        ),
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleUpvoteDetail = async (
  event,
  setThreadDetail,
  setIsError,
  postId,
  isUpVoted,
  isDownVoted,
  userLogin,
) => {
  event.stopPropagation();

  if (!userLogin) {
    setIsError("Silahkan login terlebih dahulu");
    return;
  }

  try {
    const response = await axiosInstance.post(`/vote-posts/${postId}/up-vote`);
    if (response.status === 200) {
      setThreadDetail((prevDetail) => ({
        ...prevDetail,
        upVotesCount: isUpVoted
          ? prevDetail.upVotesCount - 1
          : prevDetail.upVotesCount + 1,
        isUpVoted: !isUpVoted,
        downVotesCount: isDownVoted
          ? prevDetail.downVotesCount - 1
          : prevDetail.downVotesCount,
        isDownVoted: false,
      }));
    }
  } catch (error) {
    console.log("Error handling upvote:", error);
  }
};

export const handleDownvoteDetail = async (
  event,
  setThreadDetail,
  setIsError,
  postId,
  isDownVoted,
  isUpVoted,
  userLogin,
) => {
  event.stopPropagation();

  if (!userLogin) {
    setIsError("Silahkan login terlebih dahulu");
    return;
  }

  try {
    const response = await axiosInstance.post(
      `/vote-posts/${postId}/down-vote`,
    );
    if (response.status === 200) {
      setThreadDetail((prevDetail) => ({
        ...prevDetail,
        downVotesCount: isDownVoted
          ? prevDetail.downVotesCount - 1
          : prevDetail.downVotesCount + 1,
        isDownVoted: !isDownVoted,
        upVotesCount: isUpVoted
          ? prevDetail.upVotesCount - 1
          : prevDetail.upVotesCount,
        isUpVoted: false,
      }));
    }
  } catch (error) {
    console.log("Error handling downvote:", error);
  }
};
