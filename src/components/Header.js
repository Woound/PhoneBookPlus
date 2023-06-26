import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Login from './Login';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar bg='dark' data-bs-theme='dark' className='bg-body-tertiary'>
      <Container>
        <Link to='/' className='text-white fs-3 scale text-decoration-none'>
          PhoneBook+
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Login />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
