import React, { useEffect, useState } from 'react';
import firebase, { providerTwitter } from './firebase';
import { User } from '@firebase/auth-types'
import './App.css';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    });
  }, []);

  const login = () => {
    firebase.auth().signInWithRedirect(providerTwitter);
  };

  const logout = () => {
    firebase.auth().signOut();
  };

  return (
    <div className="App">
      <p className="App-intro">
        UID: {user && user.uid}
      </p>

      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Login with twitter</button>
      )}
    </div>
  );
};

export default App;