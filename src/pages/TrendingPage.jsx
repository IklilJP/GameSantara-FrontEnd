import React, { useEffect, useState, useRef } from "react";
import CardThread from "../components/CardThread";
import MainLayout from "../components/MainLayout";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchDataService } from "../api/apiServices";
import { MdScubaDiving } from "react-icons/md";

const TrendingPage = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const isInitialLoad = useRef(true);

  const fetchDataPosts = async () => {
    fetchDataService(page, "trend", hasMore, setPosts, setPage, setHasMore);
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
          <div className="w-full flex justify-center py-5">
            <span className="loading loading-spinner loading-md text-red-600"></span>
          </div>
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
        <CardThread posts={posts} setPosts={setPosts} />
      </InfiniteScroll>
    </MainLayout>
  );
};

export default TrendingPage;
