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

    setPosts((prev) => [...prev, ...newPosts]);
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
