import homeImage from '../assets/phonebook.png';

const HomePage = () => {
  return (
    <main>
      <div className='d-flex justify-content-center mt-5'>
        <h1 className='text-center main-heading'>
          <span className='project-name text-primary'>PhoneBook+</span>
          <br />
          <span className='project-tagline text-muted fs-3'>
            Your Digital Directory for Contacts and Connections
          </span>
        </h1>
      </div>
      <div className='img-container mt-5'>
        <img
          className='home-image img-fluid img-thumbnail mx-auto d-block'
          src={homeImage}
          alt='Book img with lady connections in brain structured'
        />
      </div>
    </main>
  );
};

export default HomePage;
