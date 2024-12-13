import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import "react-quill/dist/quill.snow.css"; // Or "quill.bubble.css" if you're using the bubble theme
import PostCard from "../components/PostCard";
import Hero from "../components/Hero";
import { customButtonTheme } from "../customThemes/buttonTheme";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      const fetchPosts = async () => {
        const res = await fetch("/api/post/get-post");
        const data = await res.json();
        setPosts(data.posts);
      };
      fetchPosts();
    } catch (error) {
      console.log(error.message);
    }
  });
  return (
    <div className="min-h-screen ">
      <div className="">
        <Hero />
        <hr className="w-11/12 md:w-3/4 mt-16 mx-auto h-0.5" />
      </div>

      <div className="flex flex-col mx-3">
        <div className="flex items-center justify-center h-24 my-10">
          <h1 className="text-4xl font-bold text-gray-900 text-center ">
            Featured Posts
          </h1>
        </div>
        <div className="container sm:mx-auto mb-24 grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-8 ">
          {posts &&
            posts.length > 0 &&
            posts.slice(0, 2).map((post, i) => (
              <div key={i}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="rounded-md h-[550px] object-cover"
                  key={i}
                />
                <div className="flex flex-col justify-between gap-4 py-2">
                  <h2 className="text-3xl font-bold">{post.title}</h2>

                  <p
                    className="line-clamp-15 md:line-clamp-6 lg:line-clamp-15"
                    dangerouslySetInnerHTML={{ __html: post && post.content }}
                  ></p>

                  <div className="">
                    <Link to={`/post/${post.slug}`}>
                      <Button
                        theme={customButtonTheme}
                        color="signup"
                        className=""
                      >
                        Read More
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <hr className="w-11/12 md:w-3/4 mb-10  mx-auto h-0.5" />

        <section className="container mx-auto">
          <p className="ml-3 text-lg">Related Posts</p>
          <div className="my-2 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
            {posts &&
              posts.length > 0 &&
              posts
                .slice(-3)
                .map((post) => <PostCard key={post._id} post={post} />)}
          </div>
        </section>
      </div>
    </div>
  );
};
export default Home;
