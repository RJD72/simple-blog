import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import ProfilePage from "./pages/ProfilePage";
import CreatePost from "./pages/CreatePost";

import FooterComp from "./components/FooterComp";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import PostPage from "./pages/PostPage";
import ScrollToTop from "./components/ScrollToTop";
import SearchResults from "./pages/SearchResults";
import UpdatePost from "./pages/UpdatePost";
import Dashboard from "./pages/Dashboard";
import AllUsers from "./pages/AllUsers";
import AllComments from "./pages/AllComments";
import AllPosts from "./pages/AllPosts";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/search" element={<SearchResults />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route element={<OnlyAdminPrivateRoute />}>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:postId" element={<UpdatePost />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/all-users" element={<AllUsers />} />
            <Route path="/all-comments" element={<AllComments />} />
            <Route path="/all-posts" element={<AllPosts />} />
          </Route>
          <Route path="/post/:postSlug" element={<PostPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
        <FooterComp />
      </BrowserRouter>
    </>
  );
};
export default App;
