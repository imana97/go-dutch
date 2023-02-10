import Nav from 'react-bootstrap/Nav';
import { userStore } from '../store';
import { observer } from 'mobx-react';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const UserMenuComponent = observer(() => {
  return (
    <>
      {userStore.loggedInUser ? (
        <NavDropdown
          title={userStore.loggedInUser.get('name')}
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item as={Link} to="/account">
            Account
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/notifications">
            Notifications
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item as={Link} to="/logout">
            Log out
          </NavDropdown.Item>
        </NavDropdown>
      ) : (
        <Nav.Link as={Link} to="/login">
          Login
        </Nav.Link>
      )}
    </>
  );
});
