import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Parse from 'parse';
import { userStore } from '../store';

export const LogoutContainer = () => {
  const navigate = useNavigate();
  useEffect(() => {
    //log out the user
    Parse.User.logOut().then(() => {
      userStore.setLoggedInUser(undefined);
      navigate('/', { replace: true });
    });
  }, []);
  return <>Logging you off...</>;
};
