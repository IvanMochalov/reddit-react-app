import React from "react";
import styles from "./homePage.css";
import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div className={styles.content}>
      <Link to='/posts'>
        <div className={styles.show_lost}>Go to posts list</div>
      </Link>
    </div>
  );
}
