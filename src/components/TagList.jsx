import { Link, useLocation } from "react-router-dom";

const TagList = ({ imgUrl, title, id }) => {
  const { pathname } = useLocation();
  console.log(pathname);

  const pathId = `/${id}`;

  return (
    <li
      className={` py-2 transition ${pathname === pathId ? "bg-red-600" : "hover:bg-gray-700"}`}>
      <Link to={`/${id}`}>
        <button type="button" className="flex items-center gap-3 px-4">
          <div className="bg-white rounded-full w-6 h-6 ">
            <img
              src={imgUrl}
              alt="Login Background"
              className="object-contain"
            />
          </div>
          <p className="tracking-wider capitalize">{title}</p>
        </button>
      </Link>
    </li>
  );
};

export default TagList;
