import { useState } from 'react';
import './App.css';

interface Todo {
  id: number;
  task: string;
}

function App() {
  const [inputText, setInputText] = useState<string>('');
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [modelText, setModelText] = useState<string>('');
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [showEditInputText, setShowEditInputText] = useState<boolean>(false);

  const onEdit = (todo: Todo) => {
    setModelText(todo.task);
    setSelectedTodoId(todo.id);
    setShowEditInputText(true);
  };

  const onClose = () => {
    setModelText('');
    setShowEditInputText(false);
  };

  const addTodo = () => {
    if (inputText.trim()) {
      const todo = {
        id: Date.now(),
        task: inputText.trim(),
      };
      setTodoList([...todoList, todo]);
      setInputText('');
    } else {
      alert('Please write something to add');
    }
  };

  const deleteTodo = (todo: Todo) => {
    const updatedTodoList = todoList.filter((itm) => itm.id !== todo.id);
    setTodoList(updatedTodoList);
    alert('Todo deleted');
  };

  const onSave = () => {
    setTodoList((prevList) =>
      prevList.map((itm) =>
        itm.id === selectedTodoId ? { ...itm, task: modelText } : itm
      )
    );
    setInputText('');
    setShowEditInputText(false);
  };


  return (
    <>
      <div className="card-form">
        <h1 className="heading">TODO app Created with Vite and TypeScript</h1>
        <textarea
          name="todo"
          id="todo"
          className="todo-textarea"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>
        <div className="button">
          <button onClick={addTodo}>Add Todo</button>
        </div>
      </div>

      <div className="card-form">

        {
          showEditInputText &&
          <div>
            <input
              type="text"
              value={modelText}
              onChange={(e) => setModelText(e.target.value)}
            />
            <button className="close-button" onClick={onClose}>
              ×
            </button>
            <button className="save-button" onClick={onSave}>
              ✔
            </button>
          </div>

        }
        <ul className="todo-list">
          {todoList.map((itm) => (
            <li key={itm.id}>
              {itm.task}
              <button onClick={() => deleteTodo(itm)}>Delete</button>
              <button onClick={() => onEdit(itm)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>


    </>
  );
}

export default App;
