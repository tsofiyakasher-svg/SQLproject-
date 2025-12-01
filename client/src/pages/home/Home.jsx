import { Outlet } from "react-router";
import { useNavigate, Link } from "react-router";
import Logout from "./components/Logout";
import "../../css/Home.css";
function Home() {
  const navigate = useNavigate();
  if (!localStorage.getItem("ActiveUser")) {
    navigate("/login");
  }
  return (
    <>
      <div className="top-bar">
        <header className="top-bar-header">
          <h1 className="title">home</h1>
          <p className="greeting">
            hello{" "}
            <strong>
              {JSON.parse(localStorage.getItem("ActiveUser")).user_name}
            </strong>
          </p>
          <p className="subtitle">What would you like to explore today?</p>
          <Logout />
        </header>

        <nav className="quick-links">
          <Link to="info" className="nav-card">
            Info
          </Link>
          <Link to="todolist" className="nav-card">
            Todos
          </Link>
          <Link to="posts" className="nav-card">
            Posts
          </Link>
        </nav>
      </div>
      <Outlet />
    </>
  );
}

export default Home;
