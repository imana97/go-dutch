import { Button } from 'react-bootstrap';
import { userStore } from '../store';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export const SplitwiseLoginComponent = () => {
  const { hash, search } = useLocation();
  const token = hash.substring(hash.indexOf('=') + 1, hash.indexOf('&'));
  const dataFetchedRef = useRef(false);
  const errorMessage = decodeURIComponent(
    search.substring(search.indexOf('=') + 1, search.length),
  );
  console.log(errorMessage);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    // this will run once
    if (token && typeof token === 'string' && token.length === 40) {
      console.log('token exist', token);
      window.location.hash = ''; // clear hash immediately
      // login user
      userStore.loginWithSplitwise(token).then();
    }
  }, [token]);

  return (
    <Button onClick={(event) => userStore.redirectToSplitwise()}>
      Login with Splitwise
    </Button>
  );
};
