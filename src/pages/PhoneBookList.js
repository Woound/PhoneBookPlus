import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

const PhoneBookList = ({ entries, searchQuery }) => {
  const handleDeletion = async id => {
    const entryDoc = doc(db, 'entries', id);
    await deleteDoc(entryDoc);
    window.location.reload();
  };

  return (
    <main>
      <Container className='entries-container' fluid='md'>
        <Row>
          {entries
            ? entries.map((entry, index) => (
                <Col key={index}>
                  <Card
                    bg='light'
                    key='light'
                    text='dark'
                    style={{ width: '18rem' }}
                    className='mb-2'
                  >
                    <Card.Title className='m-2'>{entry.name}</Card.Title>
                    <Card.Text className='m-2'>{entry.phoneNumber}</Card.Text>
                    <Button
                      onClick={() => handleDeletion(entry.id)}
                      className='bg-danger text-white fw-bold delete-btn mx-2 mb-2'
                    >
                      Delete
                    </Button>
                  </Card>
                </Col>
              ))
            : null}
        </Row>
      </Container>
    </main>
  );
};

export default PhoneBookList;
