import React, { useContext } from 'react';
import styles from './CreateList.module.css';
import { getDb, postDb } from '../../Helpers/fetch';
import { TodoContext } from '../TodoContext';

const CreateList = () => {
  const { setTodos, endpoint } = useContext(TodoContext);

  async function handleCreateTodo() {
    await postDb("todos", { title: "", COLOR: "#FFFFFF", pinned: 0, tagId: null });
    await getDb(endpoint, setTodos);
  }

  return (
    <button className={styles.createlist} onClick={handleCreateTodo}>Criar Nova Lista</button>
  )
}

export default CreateList;