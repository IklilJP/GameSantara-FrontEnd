import axiosInstance from "./axiosInstance";

export const sendComment = async (
  postId,
  content,
  parentCommentId,
  setComments,
  userLogin, // assuming you have user details from the logged-in user
) => {
  try {
    const response = await axiosInstance.post("/comment", {
      postId: postId,
      content: content,
      parentCommentId: parentCommentId,
    });

    if (response.data.status === 201) {
      const newComment = {
        id: response.data.data.id, // id of the new comment
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

export const getComment = async (postId, setComments) => {
  try {
    const response = await axiosInstance.get(`/comment?postId=${postId}`);

    setComments(response.data.data);
  } catch (error) {
    console.log(error);
  }
};
