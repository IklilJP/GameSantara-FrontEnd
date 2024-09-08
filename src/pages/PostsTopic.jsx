import { useParams } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState, useCallback } from "react";
import { MdScubaDiving } from "react-icons/md";
import CardThread from "../components/CardThread";
import { fetchPostByTag } from "../api/apiServices";

const PostsTopic = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [tab, setTab] = useState("");
  const { tagId } = useParams();

  useEffect(() => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
  }, [tagId, tab]);

  const fetchDataPosts = useCallback(async () => {
    if (!hasMore) return;

    try {
      await fetchPostByTag(
        page,
        hasMore,
        setPosts,
        setPage,
        setHasMore,
        tab,
        tagId,
      );
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  }, [page, hasMore, tagId, tab]);

  useEffect(() => {
    fetchDataPosts();
  }, [fetchDataPosts, tab]);

  return (
    <MainLayout>
      <div
        role="tablist"
        className="tabs tabs-boxed bg-softBlack my-2 drop-shadow-lg">
        <button
          role="tab"
          className={`tab font-bold drop-shadow-lg ${tab === "tag" ? " bg-red-600 text-white" : ""}`}
          onClick={() => setTab("tag")}>
          Beranda
        </button>
        <button
          role="tab"
          className={`tab font-bold drop-shadow-lg ${tab === "tag-trend" ? " bg-red-600 text-white" : ""}`}
          onClick={() => setTab("tag-trend")}>
          Trending
        </button>
        <button
          role="tab"
          className={`tab font-bold drop-shadow-lg ${tab === "tag-latest" ? " bg-red-600 text-white" : ""}`}
          onClick={() => setTab("tag-latest")}>
          Terbaru
        </button>
      </div>

      <InfiniteScroll
        dataLength={posts.length}
        next={fetchDataPosts}
        hasMore={hasMore}
        loader={
          <div key={0} className="w-full flex justify-center py-5">
            <span className="loading loading-spinner loading-md text-red-600"></span>
          </div>
        }
        scrollableTarget="scrollMain"
        endMessage={
          <div
            key={0}
            className="flex flex-col justify-center items-center gap-2 py-2">
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
