import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function NavbarComponent() {
  return (
    <>
      <Navbar fluid className="navbar">
        <Container>
          <Navbar.Brand href="#home" style={{ color: "white"}}>
            <img 
              alt=""
              src="/favicon.ico"
              width="30"
              height="30"
              className="d-inline-block align-top"

            />{' '}
            Resume Machine
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponent;