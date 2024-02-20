import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuthenticator } from '@aws-amplify/ui-react';
import {
  Outlet
} from 'react-router-dom';

function BasicExample() {
  const { signOut } = useAuthenticator(context => [context.user]);
  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/add">Add Employee</Nav.Link>
            <button onClick={signOut} className='outline-none border-0 bg-transparent'>Logout</button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet />
    </>
  );
}

export default BasicExample;