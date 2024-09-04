import React, { useEffect, useState, useRef } from "react";
import CardThread from "../components/CardThread";
import MainLayout from "../components/MainLayout";
import axiosInstance from "../api/axiosInstance";
import InfiniteScroll from "react-infinite-scroll-component";
import { getAllPosts } from "../api/apiServices";
import { MdScubaDiving } from "react-icons/md";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const isInitialLoad = useRef(true);

  const fetchDataPosts = async () => {
    if (!hasMore) return;

    try {
      const response = await getAllPosts(page);
      const newPosts = response.data.data;

      if (response.data.status === 200) {
        setPosts((prev) => [...prev, ...newPosts]);
        setPage((prevIndex) => prevIndex + 1);
        setHasMore(response.data.paging.hasNext);
      } else if (error.response.status === 404) {
        setHasMore(false);
      } else {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      fetchDataPosts();
    }
  }, []);

  return (
    <MainLayout>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchDataPosts}
        hasMore={hasMore}
        loader={
          <span className="loading loading-spinner loading-md text-red-600"></span>
        }
        scrollableTarget="scrollMain"
        endMessage={
          <div className="flex flex-col justify-center items-center gap-2 py-2">
            <div className="flex items-center gap-2">
              <MdScubaDiving size={30} color="#dc2626" />
              <span>Kamu menyelam terlalu dalam</span>
            </div>
            <span>Sudah tidak ada postingan lagi</span>
          </div>
        }>
        <CardThread posts={posts} />
      </InfiniteScroll>
    </MainLayout>
  );
}

export default HomePage;
