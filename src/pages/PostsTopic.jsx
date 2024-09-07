import { useLocation } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { FaShare } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useRef, useState } from "react";

const PostsTopic = () => {
  const { state } = useLocation();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const isInitialLoad = useRef(true);

  const fetchDataPosts = async () => {
    fetchDataService(page, "trend", hasMore, setPosts, setPage, setHasMore);
  };

  useEffect(() => {}, []);
  return (
    <MainLayout>
      <div className="bg-softBlack drop-shadow">
        <div className="flex gap-2 px-8 py-2">
          <img src={state} alt="" width={60} />
          <div className="flex flex-col gap-2">
            <p className="font-bold">Moba</p>
            <FaShare size={18} />
          </div>
        </div>
      </div>

      <ul className="flex w-full justify-evenly border-t border-t-colorBorder bg-softBlack">
        <li className="font-bold py-2 border-b-2 border-red-600">Beranda</li>
        <li className="font-bold py-2 border-b-2 border-red-600">Trending</li>
        <li className="font-bold py-2 border-b-2 border-red-600">Terbaru</li>
      </ul>

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

export default PostsTopic;
