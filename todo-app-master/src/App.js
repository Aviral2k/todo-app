import './App.css';
import TodoHeader from './components/TodoHeader';
import TodoItem from './components/TodoItem';
import './style.css';
import { useState, useEffect } from 'react';
import AddTodo from './components/AddTodo';
import { db } from './firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

function App() {

  const Status = Object.freeze({
    TODO: 0,
    IN_PROGRESS: 1,
    DONE: 2,
  })

  const [todos, setTodos] = useState([]);
  const [isAddTodoEnabled, setIsAddTodoEnabled] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      const querySnapshot = await getDocs(collection(db, 'todos'));
      const todoData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTodos(todoData);
    };
    fetchTodos();
  }, []);

  const handleAddTodoItem = () => {
    setIsAddTodoEnabled(true);
  }

  const saveTodo = async (todoTitle) => {
    await addDoc(collection(db, 'todos'), {
      title: todoTitle,
      status: Status.TODO,
    });
    // Refresh todos
    const querySnapshot = await getDocs(collection(db, 'todos'));
    const todoData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTodos(todoData);
  }

  return (
    <>
      <div className='container'>
        <TodoHeader text="Todo App"></TodoHeader>
        {todos.map((todo) => (
          <TodoItem key={todo.id} status={todo.status} title={todo.title}></TodoItem>
        ))}
        <AddTodo isAddTodoEnabled={isAddTodoEnabled} handleSaveTodo={saveTodo}></AddTodo>
        <button className="todo-button" onClick={handleAddTodoItem}>Add Item</button>
      </div>
   </>
  );
}

export default App;
