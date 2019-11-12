import React, { createContext, useState, useEffect } from 'react';
import { auth, createUserDocument } from "./../components/firebase";

export const UserContext = createContext({ user: null });

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [sus, setSus] = useState(null);
  //unsubscribeFromAuth = null;
  useEffect(() => {
    const fetch = async () => {
      auth.onAuthStateChanged(async user => {
        if (user) {
          const userRef = await createUserDocument(user);
          console.log(userRef);
          userRef.onSnapshot(snap => {
            console.log(snap);
            setUser(snap.data());
          });
        } else setUser(user);
      });
    };

    fetch();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
