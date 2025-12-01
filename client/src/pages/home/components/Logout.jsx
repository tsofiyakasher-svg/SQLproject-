import { useNavigate } from "react-router";

function Logout() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("ActiveUser");
    navigate("/login");
  }
  return (
    <>
      <button onClick={handleLogout}> Log Out </button>
    </>
  );
}

export default Logout;
