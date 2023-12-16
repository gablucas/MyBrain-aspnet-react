import React, { useRef } from 'react';
import styles from '../Container/List.module.css';
import { getDb, postDb } from '../../../Helpers/fetch';
import { TodoContext } from '../../TodoContext';

const NewTask = ({ todo }) => {
  const { setTodos } = React.useContext(TodoContext);
  const [task, setTask] = React.useState("");
  const newTaskRef = useRef();

  async function handleKeyDown(e) {
    if(e.key === "Enter") {
      e.preventDefault();

      await postDb("tasks", { TodoId: todo.todoId, Description: task, Checked: 0 });
      await getDb("todos", setTodos);
      setTask("");
    }
  }
  
  // Aplica o .focus() na ultima tarefa adicionada
  React.useEffect(() => {
    const lastTask = newTaskRef.current.previousElementSibling.lastElementChild?.firstElementChild.nextElementSibling;
    if(lastTask) {
      lastTask.focus();
      lastTask.setSelectionRange(1, 1);
    }
  }, [])

  return (
    <div className={styles.newtask} ref={newTaskRef}>
      <textarea type="text" placeholder='Nova tarefa' value={task} onChange={(e) => setTask(e.target.value)} onKeyDown={handleKeyDown} />
    </div>
  )
}

export default NewTask;