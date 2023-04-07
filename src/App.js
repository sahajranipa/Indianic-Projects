import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddPost from "./components/AddPost";
import Post from "./components/Post";
import PostsList from "./components/PostsList";
const App = () => {
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    if (posts?.length) {
      localStorage.setItem("myPosts", JSON.stringify(posts));
    }
  }, [posts]);
  return (
    <Router>
      <nav className='navbar navbar-expand navbar-dark bg-dark'>
        <a href='/posts' className='navbar-brand'>
          React Post CRUD App
        </a>
        <div className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <Link to={"/posts"} className='nav-link'>
              Posts
            </Link>
          </li>
          <li className='nav-item'>
            <Link to={"/add"} className='nav-link'>
              Add
            </Link>
          </li>
        </div>
      </nav>
      <div className='container mt-3'>
        <Routes>
          <Route path='/' element={<PostsList />} />
          <Route path='/posts' element={<PostsList />} />
          <Route path='/add' element={<AddPost />} />
          <Route path='/posts/:id' element={<Post />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;
