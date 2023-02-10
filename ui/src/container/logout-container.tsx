import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Parse from 'parse';
import { userStore } from '../store';

export const LogoutContainer = () => {
  const navigate = useNavigate();
  useEffect(() => {
    //log out the user
    Parse.User.logOut()
      .then(() => {
        userStore.setLoggedInUser(undefined);
        navigate('/login', { replace: true });
      })
      .catch((error: any) => {
        // if you get any error, clear local storage and redirect the user to login
        localStorage.clear();
        navigate('/login', { replace: true });
      });
  }, []);
  return <>Logging you off...</>;
};
