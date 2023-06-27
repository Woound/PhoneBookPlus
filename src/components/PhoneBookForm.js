import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase-config';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { Form, Button } from 'react-bootstrap';
import PhoneBookList from '../pages/PhoneBookList';

const PhoneBookForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [entries, setEntries] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  // Used to establish a connection to the entries collecton in the database.
  const entriesCollectionRef = collection(db, 'entries');

  const handleQueryChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const addEntry = async event => {
    event.preventDefault();
    await addDoc(entriesCollectionRef, {
      name: newName,
      phoneNumber: newNumber,
      accountID: auth.currentUser.uid,
    });
    setNewName('');
    setNewNumber('');
    window.location.reload();
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
  }, []);

  const filteredEntries = entries
    ? entries.filter(entry =>
        entry.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      )
    : null;

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
              <Form.Control
                onChange={handleNameChange}
                type='Text'
                placeholder='Enter Name'
                value={newName}
              />
              {/* <Form.Text className='text-muted'>
              We'll never share your email with anyone else.
            </Form.Text> */}
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicNumber'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                onChange={handleNumberChange}
                type='Text'
                placeholder='Enter Phone Number'
                value={newNumber}
              />
            </Form.Group>
            <div className='d-grid mt-4'>
              <Button
                onClick={addEntry}
                variant='primary'
                type='submit'
                className='fw-bold'
              >
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
      <PhoneBookList entries={filteredEntries} searchQuery={searchQuery} />
    </main>
  );
};

export default PhoneBookForm;
