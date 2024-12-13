/* eslint-disable react/prop-types */
import { Button } from "flowbite-react";
import { customButtonTheme } from "../customThemes/buttonTheme";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div>
      <div className="bg-white p-6 shadow rounded">
        <div className="h-40 bg-gray-200 mb-4 overflow-hidden ">
          <img src={post.image} alt={post.title} />
        </div>
        <h3 className="text-xl font-bold mb-2 line-clamp-1">{post.title}</h3>
        <div className="line-clamp-4">
          <p
            className="text-gray-600"
            dangerouslySetInnerHTML={{ __html: post && post.content }}
          ></p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="">
            {new Date(post.createdAt).toLocaleDateString()}
          </div>

          <div className="">
            <Link to={`/post/${post.slug}`}>
              <Button theme={customButtonTheme} color="signup" className="">
                Read More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostCard;
