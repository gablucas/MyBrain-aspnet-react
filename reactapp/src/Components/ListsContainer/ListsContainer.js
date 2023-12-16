import React from 'react';
import Masonry from 'react-masonry-css';
import { TodoContext } from '../TodoContext';
import List from '../List/Container/List';



const ListsContainer = () => {
  const { todos } = React.useContext(TodoContext);

  const breakpointColumnsObj = {
    default: 5,
    1920: 4,
    1440: 3,
    1100: 2,
    700: 1
  };

  return (
    <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
      {todos?.map((todo) => (<List key={todo.todoId} todo={todo} />))}
    </Masonry>
  )
}

export default ListsContainer;