import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice";

import { customButtonTheme } from "../customThemes/buttonTheme";
import { customNavLinkTheme } from "../customThemes/navLinkTheme";
import Search from "./Search";
const apiBaseUrl = import.meta.env.VITE_API_URL;

function Header() {
  const location = useLocation();
  const path = location.pathname + location.search;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const handleSignOut = async () => {
    try {
      const logoutResponse = await fetch(`${apiBaseUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      const data = await logoutResponse.json();

      if (!logoutResponse.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Navbar
        fluid
        rounded
        theme={customNavLinkTheme}
        color="failure"
        className="bg-primary text-textPrimary "
      >
        <Link to={"/"}>
          <Navbar.Brand>
            {/* <img
          src="/favicon.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        /> */}
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Simple Blog
            </span>
          </Navbar.Brand>
        </Link>
        <div className="flex md:order-2">
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="user"
                  img={
                    (currentUser.profile_pic && currentUser.profile_pic) ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">@{currentUser.username}</span>
                <span className="block text-sm font-medium truncate">
                  {currentUser.email}
                </span>
              </Dropdown.Header>
              <Link to={"/profile"}>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              {currentUser && currentUser.role === "admin" && (
                <>
                  <Dropdown.Divider />
                  <Link to={"/create-post"}>
                    <Dropdown.Item>Create Post</Dropdown.Item>
                  </Link>
                  <Dropdown.Divider />
                  <Link to={"/dashboard"}>
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                  </Link>
                </>
              )}
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
            </Dropdown>
          ) : (
            <div className="flex gap-2">
              <Link to={"/sign-in"}>
                <Button theme={customButtonTheme} color="failure">
                  Log In
                </Button>
              </Link>
              <Link to={"/sign-up"}>
                <Button theme={customButtonTheme} color="signup">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link active={path === "/"} as={"div"}>
            <Link to="/">Home</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/search"} as={"div"}>
            <Link to="/search">Posts</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/about"} as={"div"}>
            <Link to="/about">About</Link>
          </Navbar.Link>

          <Navbar.Link active={path === "/contact"}>
            <Link to="/contact">Contact</Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      <div className="bg-primary">
        <Search />
      </div>
    </>
  );
}

export default Header;
