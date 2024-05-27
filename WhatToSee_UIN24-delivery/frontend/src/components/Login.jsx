import React from 'react';
import UserList from '../components/UserList';
import { useUser } from '../hooks/UserContext'; // Importer useUser-hooken

export default function Login() {
  const { loggedIn, setLoggedInUser, user, setLoggedIn, userId, setUserId } = useUser();

  const handleLogIn = (username, userId) => {
    localStorage.setItem('loggedInUser', username);
    setLoggedInUser(username);
    localStorage.setItem('userId', userId);
    setUserId(userId);
    setLoggedIn(true);
  };

  return (
    <>
    <main>

        <h2>Hei, hvem ser på?</h2>
        <UserList user={user} loggedIn={loggedIn} setLoggedIn={setLoggedIn} handleLogIn={handleLogIn} />
        </main>
    
    </>
  );
}
