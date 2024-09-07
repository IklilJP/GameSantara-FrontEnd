import axiosInstance from "./axiosInstance";

export const fetchDataService = async (
  page,
  by,
  hasMore,
  setPosts,
  setPage,
  setHasMore,
) => {
  if (!hasMore) return;

  try {
    const response = await axiosInstance.get(
      `/post?page=${page}&size=10&by=${by}`,
    );
    const newPosts = response.data.data;

    setPosts((prevPosts) => {
      const uniqueNewPosts = newPosts.filter(
        // Filter out posts that already exist in the current state
        (newPost) =>
          !prevPosts.some((existingPost) => existingPost.id === newPost.id),
      );
      return [...prevPosts, ...uniqueNewPosts];
    });
    setPage((prevIndex) => prevIndex + 1);
    setHasMore(response.data.paging.hasNext);
  } catch (error) {
    if (error.response.status === 404) {
      setHasMore(false);
    } else {
      console.log(error);
    }
  }
};

export const fetchThreadDetailService = async (postId, setThreadDetail) => {
  try {
    const response = await axiosInstance.get(`/post/${postId}`);

    setThreadDetail(response.data.data);
  } catch (error) {
    console.log(error);
  }
};

export const fetchPostByUserId = async (
  page,
  hasMore,
  setPosts,
  setPage,
  setHasMore,
  userId,
) => {
  if (!hasMore) return;

  try {
    const response = await axiosInstance.get(
      `/post?page=${page}&size=10&by=user-target&userId=${userId}`,
    );
    const newPosts = response.data.data;

    setPosts((prevPosts) => {
      const uniqueNewPosts = newPosts.filter(
        // Filter out posts that already exist in the current state
        (newPost) =>
          !prevPosts.some((existingPost) => existingPost.id === newPost.id),
      );
      return [...prevPosts, ...uniqueNewPosts];
    });
    setPage((prevIndex) => prevIndex + 1);
    setHasMore(response.data.paging.hasNext);
  } catch (error) {
    if (error.response.status === 404) {
      setHasMore(false);
    } else {
      console.log(error);
    }
  }
};

export const fetchLikedPostsByUserId = async (
  page,
  hasMore,
  setPosts,
  setPage,
  setHasMore,
  userId,
) => {
  if (!hasMore) return;

  try {
    const response = await axiosInstance.get(
      `/post?page=${page}&size=10&by=user-upvote&userId=${userId}`,
    );
    const newPosts = response.data.data;
    console.log("likes", newPosts);

    setPosts((prevPosts) => {
      const uniqueNewPosts = newPosts.filter(
        (newPost) =>
          !prevPosts.some((existingPost) => existingPost.id === newPost.id),
      );
      return [...prevPosts, ...uniqueNewPosts];
    });
    setPage((prevIndex) => prevIndex + 1);
    setHasMore(response.data.paging.hasNext);
  } catch (error) {
    if (error.response.status === 404) {
      setHasMore(false);
    } else {
      console.log(error);
    }
  }
};
