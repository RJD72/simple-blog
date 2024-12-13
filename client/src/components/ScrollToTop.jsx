// Importing the `useEffect` hook from React and `useLocation` from React Router.
// `useEffect` allows us to perform side effects (e.g., updating the DOM) in function components.
// `useLocation` is a React Router hook that provides information about the current URL.
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Define a functional component named `ScrollToTop`.
// This component ensures that the window scrolls to the top when the route changes.
const ScrollToTop = () => {
  // Destructure the `pathname` property from the object returned by `useLocation`.
  // `pathname` represents the current URL's path (e.g., "/home", "/about").
  const { pathname } = useLocation();

  // Use the `useEffect` hook to perform the side effect of scrolling the page to the top.
  useEffect(() => {
    // Scroll the window to the top-left corner of the page smoothly.
    // `top: 0` and `left: 0` indicate the scroll position on the Y-axis and X-axis, respectively.
    // `behavior: "smooth"` enables a smooth scrolling effect.
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]); // Dependency array: The effect runs every time `pathname` changes.

  // The component doesn't render any visible UI, so it returns `null`.
  return null;
};

// Export the `ScrollToTop` component for use in other parts of the application.
export default ScrollToTop;
