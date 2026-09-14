/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { ConvexAuthProvider } from '@convex-dev/auth/react';
import { ConvexReactClient } from 'convex/react';
import '../styles/global.css';
import { AppWrapper } from '../context/state';
import { AuthProvider } from '../context/auth';
import isConvexEnabled from '../lib/convex';

const convex = isConvexEnabled()
  ? new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL)
  : null;

function ConvexAuthShell({ children }) {
  const router = useRouter();
  const replaceURL = useCallback(
    async (relativeUrl) => {
      await router.replace(relativeUrl, undefined, { shallow: true });
    },
    [router]
  );

  return (
    <ConvexAuthProvider client={convex} replaceURL={replaceURL}>
      {children}
    </ConvexAuthProvider>
  );
}

function Application({ Component, pageProps }) {
  const inner = (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );

  return (
    <AppWrapper>
      {convex ? <ConvexAuthShell>{inner}</ConvexAuthShell> : inner}
    </AppWrapper>
  );
}

export default Application;
