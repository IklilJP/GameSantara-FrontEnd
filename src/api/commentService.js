import axiosInstance from "./axiosInstance";

export const sendComment = async (
  postId,
  content,
  parentCommentId,
  setComments,
  userLogin,
) => {
  try {
    const response = await axiosInstance.post("/comment", {
      postId: postId,
      content: content,
      parentCommentId: parentCommentId,
    });

    if (response.data.status === 201) {
      const newComment = {
        id: response.data.data.id,
        content: content,
        postId: postId,
        parentCommentId: parentCommentId,
        createdAt: new Date().toISOString(),
        username: userLogin.username,
        profileImageUrl: userLogin.profilePicture.image || null,
        upVotesCount: 0,
        downVotesCount: 0,
        isUpVoted: false,
        isDownVoted: false,
      };

      setComments((prevComments) => [newComment, ...prevComments]);
    } else {
      console.log(response.data);
    }
  } catch (error) {
    console.log(error);
  }
};

// prettier-ignore
export const sendCommentChild = async ( postId, parentCommentId, content, setComments, userLogin,) => {
  try {
    const response = await axiosInstance.post("/comment/child-comment", {
      postId: postId,
      content: content,
      parentCommentId: parentCommentId,
    });

    if (response.data.status === 201) {
      const newComment = {
        id: response.data.data.id,
        content: content,
        postId: postId,
        parentCommentId: parentCommentId,
        createdAt: new Date().toISOString(),
        username: userLogin.username,
        profileImageUrl: userLogin.profilePicture.image || null,
        upVotesCount: 0,
        downVotesCount: 0,
        isUpVoted: false,
        isDownVoted: false,
      };

      // Update state with new child comment
      setComments((prevComments) => {
        const updatedComments = prevComments.map((comment) =>
          comment.id === parentCommentId
            ? {
                ...comment,
                childCommentsCount: (comment.childCommentsCount || 0) + 1,
              }
            : comment,
        );
        return [newComment, ...updatedComments];
      });
    } else {
      console.log(response.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getComment = async (postId, setComments) => {
  try {
    const response = await axiosInstance.get(`/comment?postId=${postId}`);

    setComments(response.data.data || []);
  } catch (error) {
    console.log(error);
  }
};

// prettier-ignore
export const upvoteComment = async ( setComments, commentId, isUpVoted, isDownVoted, userLogin) => {
  if (!userLogin) {
    console.log("Silahkan login terlebih dahulu");
    return;
  }

  try {
    const response = await axiosInstance.post(`/vote-comments/${commentId}/up-vote`);
    if (response.status === 200) {
      setComments((prevComments) => 
        prevComments.map((comment) => 
          comment.id === commentId
            ? {
                ...comment,
                upVotesCount: isUpVoted ? comment.upVotesCount - 1 : comment.upVotesCount + 1,
                isUpVoted: !isUpVoted,
                downVotesCount: isDownVoted ? comment.downVotesCount - 1 : comment.downVotesCount,
                isDownVoted: false,
              }
            : comment
        )
      );
    }
  } catch (error) {
    console.log("Error handling upvote:", error);
  }
};

// prettier-ignore
export const downvoteComment = async (setComments, commentId, isUpVoted, isDownVoted, userLogin) => {
  if (!userLogin) {
    console.log("Silahkan login terlebih dahulu");
    return;
  }

  try {
    const response = await axiosInstance.post(`/vote-comments/${commentId}/down-vote`);
    if (response.status === 200) {
      setComments((prevComments) => 
        prevComments.map((comment) => 
          comment.id === commentId
            ? {
                ...comment,
                downVotesCount: isDownVoted ? comment.downVotesCount - 1 : comment.downVotesCount + 1,
                isDownVoted: !isDownVoted,
                upVotesCount: isUpVoted ? comment.upVotesCount - 1 : comment.upVotesCount,
                isUpVoted: false,
              }
            : comment
        )
      );
    }
  } catch (error) {
    console.log("Error handling downvote:", error);
  }
};
