import React from 'react';
import {Routes, Route, useLocation, Navigate} from 'react-router-dom';
import './App.scss';
import {HomeContainer} from './container/home-container';
import Parse from 'parse';
import {LayoutContainer} from './container/layout-container';
import {EventGroupContainer} from "./container/event-group-container";
import {LoginContainer} from './container/login-container';

const App = (props: any) => (
  <Routes>
    <Route path="/" element={<LayoutContainer/>}>
      <Route index element={<HomeContainer/>}/>
      <Route path='/events' element={<EventGroupContainer />} />
      <Route path='/login' element={<LoginContainer />}/>
    </Route>
  </Routes>
);

const Authenticated = ({children}: { children: JSX.Element }) => {
  let location = useLocation();
  if (!Parse.User.current()) {
    return <Navigate to="/login" state={{from: location}} replace/>;
  }
  return children;
};

const Unauthenticated = ({children}: { children: JSX.Element }) => {
  if (Parse.User.current()) {
    return <Navigate to="/"/>;
  }
  return children;
};

export default App;
