import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase-config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Form, Button } from 'react-bootstrap';
import PhoneBookList from '../pages/PhoneBookList';

const PhoneBookForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [entries, setEntries] = useState([]);

  // Used to establish a connection to the entries collecton in the database.
  const entriesCollectionRef = collection(db, 'people');

  const handleQueryChange = event => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const getEntries = () => {
      const user = auth.currentUser;
      if (user) {
        const accountId = user.uid;
        const q = query(
          entriesCollectionRef,
          where('accountID', '==', accountId)
        );
        getDocs(q)
          .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id,
            }));
            setEntries(data);
          })
          .catch(error => {
            console.log(error);
          });
      }
    };
    getEntries();
  }, [entriesCollectionRef]);

  return (
    <main>
      <section className='phonebook-container d-flex justify-content-center flex-column align-items-center mt-5'>
        <div className='form-container p-4 shadow-lg bg-white rounded'>
          <h1 className='phonebook-title text-center mb-4'>
            {localStorage.getItem('display-name')}'s PhoneBook
          </h1>
          <Form>
            <Form.Group className='mb-3' controlId='formBasicName'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='Text' placeholder='Enter Name' />
              {/* <Form.Text className='text-muted'>
              We'll never share your email with anyone else.
            </Form.Text> */}
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicNumber'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type='Text' placeholder='Enter Phone Number' />
            </Form.Group>
            <div className='d-grid mt-4'>
              <Button variant='primary' type='submit' className='fw-bold'>
                Add Person
              </Button>
            </div>
          </Form>
          <h4 className='search-title text-center text-primary mt-4 mb-4'>
            Or Search By
          </h4>
          <Form.Group className='mb-3' controlId='formBasicName'>
            <Form.Control
              onChange={handleQueryChange}
              type='Text'
              placeholder='Enter Search Query'
            />
          </Form.Group>
        </div>
      </section>
      <PhoneBookList entries={entries} searchQuery={searchQuery} />
    </main>
  );
};

export default PhoneBookForm;
