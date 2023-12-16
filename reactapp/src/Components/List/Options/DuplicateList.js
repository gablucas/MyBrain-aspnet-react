import React from 'react';
import styles from './ListOptions.module.css';
import { getDb, postDb } from '../../../Helpers/fetch';
import { TodoContext } from '../../TodoContext';

const DuplicateList = ({ todo }) => {
  const { setTodos, endpoint } = React.useContext(TodoContext);

  async function handleDuplicateList() {
    await postDb("todos", { title: todo.title, tagId: todo.tagid, color: todo.color });
    await getDb(endpoint, setTodos);
  }

  return (
    <div className={`${styles.duplicate} ${styles.option}`} onClick={handleDuplicateList}></div>
  )
}

export default DuplicateList;