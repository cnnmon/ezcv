/* eslint-disable react/jsx-no-constructed-context-values, no-underscore-dangle */
import React, { createContext, useContext } from 'react';
import { useAuthActions } from '@convex-dev/auth/react';
import { useConvexAuth, useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import isConvexEnabled from '../lib/convex';

const disabledValue = {
  user: null,
  ready: true,
  enabled: false,
  signIn: async () => {
    throw new Error(
      'Add NEXT_PUBLIC_CONVEX_URL in .env.local to enable Google sign-in. See the README.'
    );
  },
  logOut: async () => {},
};

const AuthContext = createContext(disabledValue);

function mapUser(profile) {
  if (!profile) {
    return null;
  }
  return {
    uid: profile._id, // Convex document id
    name: profile.name,
    email: profile.email,
    photoURL: profile.image,
  };
}

function LiveAuth({ children }) {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { signIn, signOut } = useAuthActions();
  const profile = useQuery(api.users.current, isAuthenticated ? {} : 'skip');

  const user = isAuthenticated ? mapUser(profile) : null;
  const ready = !isLoading && !(isAuthenticated && profile === undefined);

  const value = {
    user,
    ready,
    enabled: true,
    signIn: async () => {
      await signIn('google', {
        redirectTo: `${window.location.origin}/builder`,
      });
    },
    logOut: async () => {
      await signOut();
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function AuthProvider({ children }) {
  if (!isConvexEnabled()) {
    return (
      <AuthContext.Provider value={disabledValue}>
        {children}
      </AuthContext.Provider>
    );
  }
  return <LiveAuth>{children}</LiveAuth>;
}

export function useAuth() {
  return useContext(AuthContext);
}
