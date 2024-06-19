import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import TodoComponent from './components/TodoComponent';

function App() {
  const dispatch = useDispatch();
  const todos = useSelector(store => store.todos)

  return (
    <div className="App">
      <TodoComponent />
    </div>
  );
}

export default App;
