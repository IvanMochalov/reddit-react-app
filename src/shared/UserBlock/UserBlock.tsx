import React from 'react';
import { Break } from './../Break';
import { Text } from './../Text';
import { EColors } from './../../exports';
import { IconAnon } from './../Icons'
import styles from './userblock.css';
import { useAppSelector } from './../../hooks/useReduxHooks'
import { Link } from 'react-router-dom'

interface IUserBlockProps {
  avatarSrc?: string,
  username?: string,
  loading?: boolean,
  error?: string | null
}

export function UserBlock({ avatarSrc, username, loading, error }: IUserBlockProps) {
  const { oauth } = useAppSelector((state) => state.userData);
  return (
    <Link
      to={oauth ? '/account' : `https://www.reddit.com/api/v1/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&state=random_string&redirect_uri=${process.env.REDIRECT}/auth&duration=permanent&scope=read submit identity`}
      className={styles.userBox}>
      <div className={styles.avatarBox}>
        {avatarSrc
          ? <img src={avatarSrc} alt="user avatar" className={styles.avatarImage} />
          : <IconAnon />}
      </div>

      <div className={styles.username}>
          <Break size={12} />
          {loading && (
            <Text size={20} color={EColors.grey99}>Loading...</Text>
          )}
          {error && (
            <Text size={20} color={EColors.orange}>{`Error: ${error}`}</Text>
          )}
          {!loading && error === null && (
            <Text size={20} color={username ? EColors.black : EColors.grey99}>{username || 'Sign in'}</Text>
          )}
      </div>
    </Link>
  );
}
