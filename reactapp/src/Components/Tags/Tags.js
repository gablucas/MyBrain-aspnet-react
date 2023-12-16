import React from 'react';
import styles from './Tags.module.css';
import { TodoContext } from '../TodoContext';
import { getDb, postDb } from '../../Helpers/fetch';
import { getEndpointParameterValue } from '../../Helpers/handleParameters';

const Tags = () => {
  const { setTags, endpoint, setEndpoint, tags } = React.useContext(TodoContext);
  const inputRef = React.useRef();

  async function handleCreateTag() {
    const value = inputRef.current.value

    if (value) {
      await postDb("tags", { Name: value });
      await getDb("tags", setTags);
      inputRef.current.value = '';
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleCreateTag();
    }
  }

  return (
    <div className={styles.tags} >
      <button className={`${styles.tag} ${getEndpointParameterValue(endpoint, "tag") === null ? 'selected' : ''}`} onClick={() => setEndpoint("todos?tag=")}>Todas listas</button>

      {tags?.map((tag) => (
        <button key={tag.tagId} className={`${styles.tag} ${Number(getEndpointParameterValue(endpoint, "tag")) === tag.tagId ? 'selected' : ''}`} onClick={() => setEndpoint(`todos?tag=${tag.tagId}`)}>{tag.name}</button>
      ))}

      <div className={styles.createTag}>
        <input className={styles.tagName} type="text" placeholder='Criar nova tag' ref={inputRef} onKeyDown={handleKeyDown}/>
        <div className={styles.addTag} onClick={handleCreateTag}></div>
      </div>
    </div>
  )
}

export default Tags