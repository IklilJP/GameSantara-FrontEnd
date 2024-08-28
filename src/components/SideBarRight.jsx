import axios from "axios";
import React, { useEffect, useState } from "react";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { id } from "date-fns/locale";

function SideBarRight() {
  const [content, setContent] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://api.duniagames.co.id/api/content/v2/all",
      );
      setContent(response.data.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-5 px-2">
      <h3 className="font-bold text-xl">Berita Games Terbaru</h3>
      {content.map((item) => (
        <a
          key={item.id}
          className="shadow-lg"
          target="_blank"
          href={`https://duniagames.co.id/discover/article/${item.slug}`}>
          <div className="relative">
            <img src={item.image} alt={item.slug} className="rounded-lg" />
            <div className="w-full h-full bg-red-600 absolute top-0 left-0 card-news"></div>
            <div className="absolute z-20 bottom-0 px-2">
              <h4 className="text-white text-sm">{item.title}</h4>
              <div className="flex items-center gap-1">
                <span className="text-xs">{item.category.slug}</span>
                <span>&bull;</span>
                <span className="text-xs">
                  {formatDistanceToNowStrict(parseISO(item.publishedDate), {
                    addSuffix: true,
                    locale: id,
                  })}
                </span>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

export default SideBarRight;
