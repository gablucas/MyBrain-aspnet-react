import React from 'react';
import styles from './List.module.css';
import stylesListOptions from '../Options/ListOptions.module.css';
import ListTitle from '../Title/ListTitle';
import DuplicateList from '../Options/DuplicateList';
import DeleteList from '../Options/DeleteList';
import NewTask from '../NewTask/NewTask';
import TagList from '../Options/TagList';
import ChangeBackgroundColor from '../Options/ChangeBackgroundColor';
import Task from '../../Task/Task';


const List = ({ todo }) => {
  const listElement = React.useRef();

  return (
    <div className={`${styles.list} ${stylesListOptions.list}`} ref={listElement} >
      <ListTitle todo={todo} />
      
      <div className={styles.tasks}>
        {todo.tasks[0] && todo.tasks.map((task) => (<Task key={task.taskId} task={task} todo={todo} /> ))}
      </div>

      <NewTask todo={todo}  />
      
      <div className={styles.listOptions}>
        <TagList todo={todo} />
        <ChangeBackgroundColor todo={todo} listElement={listElement} />
        <DuplicateList todo={todo} />
        <DeleteList todo={todo} />
      </div>
    </div>
  )
}

export default List