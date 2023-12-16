import React, { useContext } from 'react';
import styles from './ListOptions.module.css';
import { TodoContext } from '../../TodoContext';
import { getDb, putDb } from '../../../Helpers/fetch';

const TagList = ({ todo }) => {
  const { setTodos, endpoint, tags } = useContext(TodoContext);
  const tagContainerRef = React.useRef();

  async function handleCheckboxTag(e, TagId) {
    if (e.target.classList.contains("selected")) {
      await putDb(`todos/${todo.todoId}`, { title: todo.title, color: todo.color, TagId: null });
    } else {
      await putDb(`todos/${todo.todoId}`, { title: todo.title, color: todo.color, TagId });
    }

    await getDb(endpoint, setTodos);
  }

  function handleShowTagContainer() {
    tagContainerRef.current.classList.toggle('show');
  }

  return (
    <div>
      <div className={`${styles.tag} ${styles.option}`} onClick={() => handleShowTagContainer()}></div>
      
      <div className={styles.tags} ref={tagContainerRef}>
        {tags?.map((tag) => (
          <button key={tag.tagId} className={todo.tag?.tagId === tag.tagId ? "selected" : ""} onClick={(e) => handleCheckboxTag(e, tag.tagId)}>{tag.name}</button>
        ))}</div>
    </div>
  )
}

export default TagList