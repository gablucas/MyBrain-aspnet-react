import React from 'react';
import useDebounce from '../../../Hooks/useDebounce';
import useTextarea from '../../../Hooks/useTextarea';
import styles from './ListTitle.module.css';
import { putDb } from '../../../Helpers/fetch';

const ListTitle = ({ todo }) => {
  const [displayValue, setDisplayValue] = React.useState(todo.title || "");
  const textareaRef = React.useRef(null);
  const { resizeTextarea } = useTextarea()

  function handleKeyUp(value) {
    if (value !== todo.title) {
      putDb(`todos/${todo.todoId}`, { tagId: todo.tagid, color: todo.color, title: value});
    }
  }

  const handleKeyUpDebounce = useDebounce(handleKeyUp, 500)

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }

  return (
    <>
      <textarea
        className={styles.title} 
        value={displayValue}
        onChange={({ target }) => setDisplayValue(target.value)}
        onKeyUp={({ target }) => handleKeyUpDebounce(target.value)} 
        onKeyDown={(e) => handleKeyDown(e)} 
        onInput={(e) => resizeTextarea(e)}
        ref={textareaRef}
        placeholder='Título'
        onBlur={({ target }) => handleKeyUpDebounce(target.value)}
        >
      </textarea>
    </>
  )
}

export default ListTitle