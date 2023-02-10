import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import moneyLogo from '../asset/money-logo.svg';
import { UserMenuComponent } from './user-menu-component';
import { Link } from 'react-router-dom';

export const HeaderComponent = () => (
  <Navbar fixed="top" bg="dark" variant="dark" expand="md">
    <Container>
      <Navbar.Brand as={Link} to="/">
        <img src={moneyLogo} alt="Go Dutch" /> Go Dutch
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="event-groups">
            Events group
          </Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <UserMenuComponent />
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
