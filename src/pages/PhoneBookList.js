import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const PhoneBook = ({ entries, searchQuery }) => {
  return (
    <main>
      <Container className='entries-container' fluid='md'>
        <Row>
          {entries
            ? entries
                .filter(entry =>
                  entry.name.toLowerCase().startsWith(searchQuery.toLowerCase())
                )
                .map((entry, index) => (
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
                    </Card>
                  </Col>
                ))
            : null}
        </Row>
      </Container>
    </main>
  );
};

export default PhoneBook;
