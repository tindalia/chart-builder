import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { User } from '@firebase/auth-types';
import AuthContext from './AuthContext';
import firebase from '../firebase';
import PropTypes from 'prop-types';

const AuthProvider: React.FunctionComponent = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState<Boolean>(false);

  const login = useCallback((provider: firebase.auth.AuthProvider) => {
    firebase.auth().signInWithRedirect(provider);
  }, []);

  const logout = useCallback(() => {
    setIsLoaded(false);
    firebase.auth().signOut();
    setCurrentUser(null);
    setIsLoaded(true);
  }, [setCurrentUser, setIsLoaded]);

  const info = useMemo(() => ({ currentUser, isLoaded }), [currentUser, isLoaded]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      user ? setCurrentUser(user) : setCurrentUser(null);
      setIsLoaded(true);
    });
  });

  return <AuthContext.Provider value={{ login, logout, info }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  type: PropTypes.string,
};

export default AuthProvider;
