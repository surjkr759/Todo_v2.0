import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import TodoComponent from './components/TodoComponent';
import AllTodosList from './components/AllTodosList';

function App() {
  const dispatch = useDispatch();
  const todos = useSelector(store => store.todos)

  return (
    <div>
      <AllTodosList />
    </div>
  );
}

export default App;
