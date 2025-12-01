function Info() {
  const user = JSON.parse(localStorage.getItem("ActiveUser"));
  return (
    <>
      <h2>User Information</h2>
      <ul>
        <li>Username: {user.username}</li>
        <li>Email: {user.email}</li>
        <li>Phone: {user.phone}</li>
      </ul>
    </>
  );
}

export default Info;
