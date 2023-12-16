import React, { useContext } from 'react'
import styles from './ListOptions.module.css';
import { deleteDb, getDb } from '../../../Helpers/fetch';
import { TodoContext } from '../../TodoContext';

const DeleteList = ({ todo }) => {
  const { setTodos, endpoint } = useContext(TodoContext);

  async function handleDeleteList() {
    await deleteDb(`todos/${todo.todoId}`)
    await getDb(endpoint, setTodos);
  }

  return (
    <div className={`${styles.delete} ${styles.option}`} onClick={handleDeleteList}></div>
  )
}

export default DeleteList