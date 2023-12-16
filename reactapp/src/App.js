import './App.css';
import Header from './Components/Header/Header';
import { TodoContextProvider } from './Components/TodoContext';
import TodoList from './Components/TodoList/TodoList';

function App() {
  return (
    <div className="App">
      <TodoContextProvider>
        <Header />
        <TodoList />
      </TodoContextProvider>
    </div>
  );
}

export default App;
