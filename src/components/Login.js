import { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { auth, provider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import Logout from '../components/Logout';
import { Link } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState('');

  const handleLoginClick = () => {
    signInWithPopup(auth, provider)
      .then(data => {
        setUser(data.user.email);
        localStorage.setItem('email', data.user.email);
        localStorage.setItem('display-name', data.user.displayName);
        window.location.reload();
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    setUser(localStorage.getItem('email'));
  }, []);

  return (
    <>
      {user ? (
        <>
          <Navbar.Text className='px-3 text-white'>
            Signed in as: {localStorage.getItem('display-name')}
          </Navbar.Text>
          <Link
            to='/phonebook'
            className='text-white fs-5 scale text-decoration-none mx-5'
          >
            <Button variant='success'>Dashboard</Button>
          </Link>
          <Logout setUser={setUser} />
        </>
      ) : (
        <button
          onClick={handleLoginClick}
          type='button'
          className='login-with-google-btn'
        >
          Sign in with Google
        </button>
      )}
    </>
  );
};

export default Login;
