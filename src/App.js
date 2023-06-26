import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import PhoneBookForm from './components/PhoneBookForm';
import AuthCheck from './components/AuthCheck';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
      </div>

      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route
          path='/phonebook'
          element={
            <AuthCheck>
              <PhoneBookForm />
            </AuthCheck>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
