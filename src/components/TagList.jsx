import { Link } from "react-router-dom";

const TagList = ({ imgUrl, title }) => {
  return (
    <li>
      <Link to={`/${title}`} state={imgUrl}>
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
