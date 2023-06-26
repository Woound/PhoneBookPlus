import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const AuthCheck = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(); // Retrieving the authentication instance from Firebase.
    onAuthStateChanged(auth, user => {
      if (user && user.email === localStorage.getItem('email')) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
      setIsLoading(false); // Changes loading to false when the authorization check is complete.
    });
  }, []);

  if (isLoading) {
    return null; // Does not display anything until the auth details have been fetched from Firebase.
  }

  if (!isAuthorized) {
    return <Navigate to='/' />; // Redirects to the home page if the user is not authorized.
  }

  return children; // Will render children components (Phonebook) if user is authorized succesfully.
};

export default AuthCheck;
