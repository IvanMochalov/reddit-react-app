import React, { useEffect, useState } from "react";
import { hot } from "react-hot-loader/root";
import { CardList } from "./shared/CardList";
import { Content } from "./shared/Content";
import { Header } from "./shared/Header";
import { Layout } from "./shared/Layout";
import "./main.global.css";

import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import { useAppDispatch } from "./hooks/useReduxHooks";
import { setToken } from "./store/mainSlice";
import store from "./store/index";
import { Post } from './shared/Post'
import { NotFound } from './shared/NotFound'
import { HomePage } from './shared/HomePage'

function AppComponent() {
  const dispatch = useAppDispatch();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!localStorage.token) {
      localStorage.setItem('token', 'undefined')
    }
    const token = (localStorage.getItem('token') === 'undefined') ? window.__token__ : localStorage.getItem('token');
    dispatch(setToken(token));
    if (token) {
      localStorage.setItem('token', token)
    }

    setMounted(true)
  }, []);

  return (
    <>
      {mounted && (
        <BrowserRouter>
          <Layout>
            <Header />
            <Content>
              <Routes>
                <Route path='/posts' element={<CardList />}>
                  <Route path='/posts/:postId' element={<Post />} />
                </Route>
                <Route path='/auth' element={<Navigate  to='/posts' replace />} />
                <Route path='*' element={<NotFound />} />
                <Route path='/' element={<HomePage />} />
                <Route path='/account' element={<Post />} />
              </Routes>
            </Content>
          </Layout>
        </BrowserRouter>
      )}
    </>
  );
}

export const App = hot(() => (
  <Provider store={store}>
    <AppComponent />
  </Provider>
));
