import React from 'react';
import firebase from 'firebase/app';
import { User } from '@firebase/auth-types';

interface AuthProps {
  currentUser: User | null;
  isLoaded: Boolean;
}

interface AuthMethods {
  login(provider: firebase.auth.AuthProvider): void;
  logout(): void;
}

type AuthContext = { info: AuthProps } & AuthMethods;

const context = React.createContext<AuthContext>({
  info: {
    currentUser: null,
    isLoaded: false,
  },
  login(): void {
    throw Error('Not Implemented!');
  },
  logout(): void {
    throw Error('Not Implemented!');
  },
});

export default context;
