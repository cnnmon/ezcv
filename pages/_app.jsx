/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import '../styles/global.css';
import { AppWrapper } from '../context/state';

function Application({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
}

export default Application;
