import { Label, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
const apiBaseUrl = import.meta.env.VITE_API_URL;

const SearchResults = () => {
  const location = useLocation(); // Access the current location
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [sort, setSort] = useState("desc");
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const term = urlParams.toString();
    const searchTitle = urlParams.get("searchTerm");

    if (term) {
      setSearchTerm(searchTitle);
      const fetchSearchResults = async () => {
        try {
          const res = await fetch(`${apiBaseUrl}/api/post/get-post?${term}`);
          if (res.ok) {
            const data = await res.json();
            setResults(data.posts);
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchSearchResults();
    } else {
      const fetchPosts = async () => {
        try {
          const res = await fetch(`${apiBaseUrl}/api/post/get-post`);
          const data = await res.json();
          if (res.ok) {
            setResults(data.posts);

            if (data.posts.length < 9) {
              setShowMore(false);
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchPosts();
    }
  }, [location.search]);

  const handleChange = (e) => {
    const selectedSort = e.target.value;
    setSort(selectedSort);

    const urlParams = new URLSearchParams(location.search);
    urlParams.set("sort", selectedSort);

    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const startIndex = results.length;
    try {
      const res = await fetch(
        `${apiBaseUrl}/api/post/get-post?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setResults((prev) => [...prev, ...data.posts]);

        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-3 min-h-screen">
      <div className="flex justify-between mt-5">
        <div>
          <h1 className="text-2xl font-bold mb-3">Search Results</h1>
          {results.length > 0 ? (
            <p>
              Showing results for: <strong>{searchTerm}</strong>
            </p>
          ) : (
            <strong>No results to display</strong>
          )}
        </div>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="sort" value="Sort by" />
          </div>
          <Select id="sort" onChange={handleChange} value={sort}>
            <option value="desc">Latest</option>
            <option value="asc">Oldest</option>
          </Select>
        </div>
      </div>

      <div className="container mx-auto my-10 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
        {results &&
          results.map((result) => <PostCard key={result._id} post={result} />)}
      </div>

      {showMore && (
        <button
          onClick={handleShowMore}
          className="w-full text-teal-500 self-center text-sm py-7"
        >
          Show more
        </button>
      )}
    </div>
  );
};

export default SearchResults;
