import { Button, TextInput } from "flowbite-react";
import { IoSearch } from "react-icons/io5";
import { customButtonTheme } from "../customThemes/buttonTheme";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return; // Prevent empty search
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", searchTerm);
    urlParams.set("sort", "desc");
    navigate(`/search?${urlParams.toString()}`);
    setSearchTerm("");
  };

  return (
    <div className="max-w-md mx-auto pt-3 pb-7">
      <form className="flex gap-1" onSubmit={handleSubmit}>
        <TextInput
          id="search"
          type="text"
          icon={IoSearch}
          placeholder="Search..."
          className="w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          theme={customButtonTheme}
          color="signup"
          className=""
          type="submit"
        >
          Search
        </Button>
      </form>
    </div>
  );
};

export default Search;
