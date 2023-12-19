import React from 'react'
import styles from './Task.module.css';
import checkedImage from '../../Assets/icons/checkbox_checked.svg';
import uncheckedImage from '../../Assets/icons/checkbox_unchecked.svg';
import useDebounce from '../../Hooks/useDebounce';
import useTextarea from '../../Hooks/useTextarea';
import { deleteDb, getDb, putDb } from '../../Helpers/fetch';
import { TodoContext } from "../TodoContext";


const Task = ({ task }) => {
  const { endpoint, setTodos } = React.useContext(TodoContext);
  const [taskValue, setTaskValue] = React.useState(task.description);
  const taskRef = React.useRef();
  const checkboxRef = React.useRef();
  const { resizeTextarea } = useTextarea()  


  async function handleUpdateTask() {
    await putDb(`tasks/${task.taskId}`, { Description: taskValue });
    await getDb(endpoint, setTodos);
  }

  const handleUpdateTaskDebounce = useDebounce(handleUpdateTask, 500);

  function handleKeyDown(e) {
    if(e.key === "Enter") {
      e.preventDefault();
    } else if(!e.target.value && e.key === "Backspace") {
      handleDelete();
    }
  }

  // Marca ou desmarca a checkbox
  async function handleCheckbox() {
    if (task.checked === 0) {
      await putDb(`tasks/${task.taskId}`, { Description: task.description, Checked: 1 });
    } else {
      await putDb(`tasks/${task.taskId}`, { Description: task.description, Checked: 0 });
    }

    getDb(endpoint, setTodos);
  }

  // Deletar a tarefa
  async function handleDelete() {
    await deleteDb(`tasks/${task.taskId}`);
    await getDb(endpoint, setTodos);
  }

  // Reajusta o tamanho da task
  React.useEffect(() => {
    resizeTextarea(taskRef.current)
  }, [resizeTextarea])

  React.useEffect(() => {
    if (task.checked !== 0) {
      checkboxRef.current.style.background = `url(${checkedImage}) no-repeat center`;
      taskRef.current.style.textDecoration = 'line-through';
      taskRef.current.style.opacity = '0.6';
    } else {
      checkboxRef.current.style.background = `url(${uncheckedImage}) no-repeat center`;
      taskRef.current.style.textDecoration = 'none';
      taskRef.current.style.opacity = '1';

    }
  }, [task.checked])

  return (
      <div className={styles.taskContainer}>

        <div className={styles.checkbox} 
          onClick={handleCheckbox} ref={checkboxRef} >
        </div>

        <textarea 
          className={styles.textarea}
          value={taskValue} 
          onChange={(e) => setTaskValue(e.target.value)} 
          onKeyDown={handleKeyDown} 
          onKeyUp={handleUpdateTaskDebounce}
          onInput={(e) => resizeTextarea(e)}
          ref={taskRef}>
        </textarea>

        <div 
          className={styles.close}
          onClick={handleDelete}>
        </div>

      </div>
  )
}

export default Task;