import React from 'react';
import CreateList from '../CreateList/CreateList';
import Tags from '../Tags/Tags';
import ListsContainer from '../ListsContainer/ListsContainer';
import styles from '../TodoList/TodoList.module.css';


const TodoList = () => {

  return (
      <section className={styles.todolist}>
        <Tags />
        <CreateList />
        <ListsContainer />
      </section>
  )
}

export default TodoList