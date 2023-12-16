import React from 'react';
import { getDb } from '../Helpers/fetch';
export const TodoContext = React.createContext();

const TodoContextProvider = ({ children }) => {
  const [endpoint, setEndpoint] = React.useState("todos?tag=");
  const [todos, setTodos] = React.useState([]);
  const [tags, setTags] = React.useState([]);

  React.useEffect(() => {
    getDb(endpoint, setTodos);
    getDb("tags", setTags);
  }, [endpoint])

  console.log(todos)
  console.log(endpoint)

  return (
    <TodoContext.Provider value={{ todos, setTodos, tags, setTags, endpoint, setEndpoint }}>
      {children}
    </TodoContext.Provider>
  )
}

export { TodoContextProvider } 