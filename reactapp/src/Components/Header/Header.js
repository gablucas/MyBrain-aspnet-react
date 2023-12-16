import React from 'react';
import styles from './Header.module.css';
import { ReactComponent as Logo } from '../../Assets/logo.svg';

const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
    </header>
  )
}

export default Header