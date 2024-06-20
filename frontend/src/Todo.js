export default function Todo(props){
    const { todo, setTodos } = props;

    const updateTodo = async (todoId, todoStatus) => {
        const res = await fetch(`/api/todos/${todoId}`, {
            method: "PUT",
            body: JSON.stringify({ status: todoStatus }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const json = await res.json();

        if (json.acknowledged) {
            setTodos(currentTodos => {
                return currentTodos.map((currentTodo) => {
                    if (currentTodo._id === todoId) {
                        return { ...currentTodo, status: !currentTodo.status }
                    }
                    return currentTodo;
                });
            })
        }
    };

    return (
        <div className="todo">
              <p>{todo.todo}</p>
              <div>
                <button className="todo__status" 
                onClick={() => updateTodo(props.todo._id, props.todo.status)}
                >
                  {(todo.status) ? "☑" : "☐"}
                </button>
              </div>
            </div>
    )
}