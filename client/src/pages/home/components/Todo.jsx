import { useEffect, useState } from "react";
function Todo() {
  const [todo, setTodo] = useState([]);
  const [value, setValue] = useState("");

  const ActiveUser = JSON.parse(localStorage.getItem("ActiveUser"));
  useEffect(() => {
    async function fetchitems() {
      try {
        const response = await fetch(
          `http://localhost:3000/todo?user_id=${ActiveUser.id}`
        );
        const todos = await response.json();
        setTodo(todos);
        console.log(todos);
      } catch (err) {
        console.log(err);
      }
    }
    fetchitems();
  }, []);

  async function handleCheckboxChange(id) {
    const listToDo = todo.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setTodo(listToDo);

    const updatedItem = listToDo.find((item) => item.id === id);

    try {
      const updateOption = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: updatedItem.completed,
          id: updatedItem.id,
        }),
      };
      console.log(updateOption);

      const response = await fetch(
        `http://localhost:3000/todo/update-todo`,
        updateOption
      );
      if (!response.ok) throw new Error("Failed to update todo");

      console.log("Todo updated on server:", updatedItem);
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  }

  async function addToDo(title) {
    const newItem = {
      title,
      completed: false,
      user_id: "" + ActiveUser.id,
    };
    console.log(newItem.user_id);
    try {
      const res = await fetch("http://localhost:3000/todo/add-todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      if (!res.ok) throw new Error();
      const createdtodo = await res.json();
      setTodo((prev) => [...prev, createdtodo]);
    } catch (err) {
      console.error(err);
      alert("couldnt add to do");
    }
  }

  async function deleteToDo(id) {
    try {
      const response = await fetch(
        `http://localhost:3000/todo/delete-todo?user_id=${ActiveUser.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) throw new Error("failed");
      setTodo((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log("error:", err);
      alert("couldnt delete todo");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    addToDo(value);
    setValue("");
  }

  return (
    <div>
      <ul>
        {todo.length === 0
          ? "No To Dos Left"
          : todo.map((todo) => (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleCheckboxChange(todo.id)}
                />
                {todo.title}
                <button onClick={() => deleteToDo(todo.id)}>delete</button>
              </li>
            ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <label htmlFor="add">Add to do</label>
        <input
          id="add"
          type="text"
          value={value}
          placeholder="new to do"
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Todo;
