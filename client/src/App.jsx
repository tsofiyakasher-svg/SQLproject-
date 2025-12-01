import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import "./App.css";
import Home from "./pages/home/Home";
import Info from "./pages/home/components/Info";
import Todo from "./pages/home/components/Todo";
import Posts from "./pages/home/components/Posts";
import Comments from "./pages/home/components/Comments";
import Signup from "./pages/Signup";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/singup" element={<Signup />} />

          <Route path="/home" element={<Home />}>
            {/* <Route index element={<Navigate to="info" />} /> */}

            <Route path="info" element={<Info />} />
            <Route path="todolist" element={<Todo />} />

            <Route path="posts" element={<Posts />} />
            <Route path="posts/post/:postId" element={<Comments />} />
          </Route>

          <Route path="*" element={<h1>EROR 404</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
