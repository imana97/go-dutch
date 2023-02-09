import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HomeContainer } from './container/home-container';
import Parse from 'parse';
import { LayoutContainer } from './container/layout-container';
import { EventGroupContainer } from './container/event-group-container';
import { LoginContainer } from './container/login-container';
import { AccessControlContainer } from './container/access-control-container';
import { SignUpContainer } from './container/sign-up-container';
import { LogoutContainer } from './container/logout-container';
import { AccountContainer } from './container/account-container';
import { NotificationContainer } from './container/notification-container';
import { PasswordResetContainer } from './container/password-reset-container';
import { PageNotFoundContainer } from './container/page-not-found-container';

const App = (props: any) => (
  <Routes>
    <Route path="/" element={<LayoutContainer />}>
      <Route index element={<HomeContainer />} />
      <Route path="/event-groups" element={<EventGroupContainer />} />

      {/* don't allow logged-in users to open sign up */}
      <Route
        path="/sign-up"
        element={
          <Unauthenticated>
            <SignUpContainer />
          </Unauthenticated>
        }
      />

      {/* don't allow logged-in users to open sign up */}
      <Route
        path="/login"
        element={
          <Unauthenticated>
            <LoginContainer />
          </Unauthenticated>
        }
      />

      <Route
        path="/password-reset"
        element={
          <Unauthenticated>
            <PasswordResetContainer />
          </Unauthenticated>
        }
      />

      {/* don't allow unauthenticated users to open logout */}
      <Route
        path="/logout"
        element={
          <Authenticated>
            <LogoutContainer />
          </Authenticated>
        }
      />

      {/* don't allow unauthenticated users to open logout */}
      <Route
        path="/account"
        element={
          <Authenticated>
            <AccountContainer />
          </Authenticated>
        }
      />

      {/* don't allow unauthenticated users to open logout */}
      <Route
        path="/notifications"
        element={
          <Authenticated>
            <NotificationContainer />
          </Authenticated>
        }
      />

      {/* don't allow unauthenticated users to open logout */}
      <Route
        path="/access-control"
        element={
          <Authenticated>
            <AccessControlContainer />
          </Authenticated>
        }
      />

      {/* all other locations */}
      <Route path="/*" element={<PageNotFoundContainer />} />
    </Route>
  </Routes>
);

const Authenticated = ({ children }: { children: JSX.Element }) => {
  let location = useLocation();
  if (!Parse.User.current()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

const Unauthenticated = ({ children }: { children: JSX.Element }) => {
  if (Parse.User.current()) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
};

export default App;
