function Info() {
  const user = JSON.parse(localStorage.getItem("ActiveUser"));
  return (
    <>
      <h2>User Information</h2>
      <ul style={{ listStyle: "none" }}>
        <li>Username: {user.user_name}</li>
        <li>Email: {user.email}</li>
        <li>Phone: {user.phone}</li>
      </ul>
    </>
  );
}

export default Info;
