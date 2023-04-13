import React, { useEffect } from 'react';
import styles from './searchblock.css';
import { UserBlock } from './../UserBlock';
import { useAppDispatch, useAppSelector } from './../../hooks/useReduxHooks';
import { fetchUserData } from './../../store/userSlice';

export function SearchBlock() {
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.main.token)
  const { data, loading, error } = useAppSelector(state => state.userData);

  useEffect(() => {
    if (!token || token === 'undefined') return;
    dispatch(fetchUserData(token))
  }, [token])

  return (
    <div className={styles.searchBlock}>
      <UserBlock avatarSrc={data.icon_img} username={data.name} loading={loading} error={error} />
    </div>
  );
}
