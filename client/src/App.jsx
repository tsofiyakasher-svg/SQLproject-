import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          

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
