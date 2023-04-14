import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useReduxHooks";
import { fetchPostsData } from "../../store/postsSlice";
import { Card } from "../Card/Card";
import styles from "./cardlist.css";

import { Outlet } from 'react-router-dom';

export interface IPostObject {
  id?: string;
  author?: string;
  title?: string;
  rating?: number;
  avatar?: string;
  previewImg?: string;
  datePostUtc?: number;
}

export function CardList() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.main.token);
  const { posts, nextAfter, loading, error } = useAppSelector((state) => state.postsData);
  const { oauth } = useAppSelector((state) => state.userData);
  const [requestCount, setRequestCount] = useState(0);
  const [isRenderList, setIsRenderList] = useState(true);
  // console.log(requestCount);

  const bottomOfList = useRef<HTMLDivElement>(null);

  function handleClick() {
    setRequestCount(0)
    setIsRenderList(true)
  }

  useEffect(() => {
    if (!token || token === "undefined") return;
    if (requestCount === 3) {
      setIsRenderList(false)
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          dispatch(fetchPostsData({ token, nextAfter }));
          setRequestCount((prevRequestCount) => prevRequestCount + 1)
        }
      },
      {
        rootMargin: "100px",
      }
    );

    if (bottomOfList.current) {
      observer.observe(bottomOfList.current);
    }

    return () => {
      if (bottomOfList.current) {
        observer.unobserve(bottomOfList.current);
      }
    };
    // bottomOfList.current
  }, [nextAfter, token, isRenderList]);

  return (
    <ul className={styles.cardsList}>
      {posts.length === 0 && !loading && !error && (
        <div className={styles.loading}>{"You need to log in"}</div>
      )}

      {posts && oauth &&
        posts.map((post: IPostObject) => (
          <Card
            key={post.id}
            postId={post.id}
            userName={post.author}
            title={post.title}
            preview={post.previewImg}
            userImg={post.avatar}
            rating={post.rating}
            timeCreated={post.datePostUtc}
          />
        ))}

      <Outlet />

      <div ref={bottomOfList} />

      {!isRenderList && <button className={styles.show_more} onClick={handleClick}>{"Download more"}</button>}

      {loading && <div className={styles.loading}>{"Loading..."}</div>}

      {error && (
        <div className={styles.error} role="alert">{`Error: ${error}`}</div>
      )}
    </ul>
  );
}
