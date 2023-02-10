import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootswatch/dist/cosmo/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Parse from 'parse';
import { appConfig } from './config';
import { userStore } from './store';

// initialize parse application
Parse.initialize(appConfig.parse.appId);
Parse.serverURL = appConfig.parse.serverURL;

// set if the user is logged in
userStore.setLoggedInUser(Parse.User.current());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
