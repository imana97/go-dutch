import Nav from 'react-bootstrap/Nav';
import { userStore } from '../store';
import { observer } from 'mobx-react';
import { NavDropdown } from 'react-bootstrap';

export const UserMenuComponent = observer(() => {
  return (
    <>
      {userStore.loggedInUser ? (
        <NavDropdown
          title={userStore.loggedInUser.get('name')}
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item href="#/account">Account</NavDropdown.Item>
          <NavDropdown.Item href="#/notifications">
            Notifications
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#/logout">Log out</NavDropdown.Item>
        </NavDropdown>
      ) : (
        <Nav.Link href="#/login">Login</Nav.Link>
      )}
    </>
  );
});
