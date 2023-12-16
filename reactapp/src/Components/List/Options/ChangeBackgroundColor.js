import React from 'react';
import styles from './ListOptions.module.css';
import ColorCircle from '../../Svgs/ColorCircle';
import { getDb, putDb } from '../../../Helpers/fetch';
import { TodoContext } from "../../TodoContext";

const ChangeBackgroundColor = ({ todo, listElement }) => {
  const { setTodos, endpoint } = React.useContext(TodoContext);
  const colorElement = React.useRef();
  const colorsOptions = React.useRef();

  async function setListColor(e) {
    const color = e.target.getAttribute('fill');

    if(color) {
      await putDb(`todos/${todo.todoId}`, { title: todo.title, tagId: todo.tagid, color });
      await getDb(endpoint, setTodos);
    }
  }

  React.useEffect(() => {
    listElement.current.style.background = todo.color;
  }, [todo.color, listElement])


  function handleShowColors() {
    colorsOptions.current.classList.toggle('show');
  }

  return (
    <div>
      <div className={`${styles.color} ${styles.option}`} onClick={handleShowColors} ref={colorElement} ></div>

      <ul onClick={(e) => setListColor(e)} className={styles.colorOptions} ref={colorsOptions} >
        <li><ColorCircle color='FFFFFF' /></li>
        <li><ColorCircle color='F28B82' /></li>
        <li><ColorCircle color='FBBC04' /></li>
        <li><ColorCircle color='FFF475' /></li>
        <li><ColorCircle color='CCFF90' /></li>
        <li><ColorCircle color='A7FFEB' /></li>
        <li><ColorCircle color='AECBFA' /></li>
        <li><ColorCircle color='FDCFE8' /></li>
        <li><ColorCircle color='E6C9A8' /></li>
      </ul>
    </div>
  )
}

export default ChangeBackgroundColor