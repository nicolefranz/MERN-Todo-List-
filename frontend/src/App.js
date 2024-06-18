import { useEffect, useState} from "react";

export default function App() {
  const [message, setMessage] = useState("");

  useEffect (() => {
    async function getTodos(){
      const res = await fetch("/api/todos");
      const todos = await res.json();

      setMessage(todos.mssg);
      //console.log(todos);
    }
    getTodos();
  }, [])
  
  return (
    <main className="container">
      <h1>MERN Todo List</h1>
      <p>{message}</p>
    </main>
  );
}


