import { Outlet } from "react-router";
import { useNavigate, Link } from "react-router";
import Logout from "./components/Logout";

function Home() {
  const navigate = useNavigate();
  if (!localStorage.getItem("ActiveUser")) {
    navigate("/home");
  }
  return (
    <>
      <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Link to="info">Info</Link>
        <Link to="todolist">To Do List</Link>
        <Link to="posts">Posts</Link>
        <Logout />
      </nav>
      <Outlet />
    </>
  );
}

export default Home;
