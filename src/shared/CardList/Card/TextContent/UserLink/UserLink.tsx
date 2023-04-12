import React from "react";
import styles from "./userLink.css";

interface IUserLinkProps {
  name?: string;
  avatar?: string;
}

export function UserLink({ name, avatar }: IUserLinkProps) {
  return (
    <div className={styles.userLink}>
      <img
        className={styles.avatar}
        src={avatar ? avatar : 'https://e7.pngegg.com/pngimages/831/88/png-clipart-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design.png'}
        alt="avatar"
      />
      <a href="#user-url" className={styles.username}>
        {name}
      </a>
    </div>
  );
}
