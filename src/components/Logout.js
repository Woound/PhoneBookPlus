import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';

const Logout = ({ setUser }) => {
  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(''); // Setting the user state to an empty value when logging out
      localStorage.clear();
      window.location.reload();
    });
  };

  return (
    <button onClick={handleLogout} className='btn btn-primary'>
      Logout
    </button>
  );
};

export default Logout;
