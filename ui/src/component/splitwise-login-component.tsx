import { Button, Image } from 'react-bootstrap';
import { userStore } from '../store';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import splitWiseLogo from '../asset/splitwise-logo.png';

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
      window.location.hash = ''; // clear hash immediately
      // login user
      userStore.loginWithSplitwise(token).then();
    }
  }, [token]);

  return (
    <Button variant="dark" onClick={(event) => userStore.redirectToSplitwise()}>
      <Image
        src={splitWiseLogo}
        style={{ height: '22px', paddingBottom: '3px' }}
      ></Image>
      &nbsp;&nbsp;&nbsp;<strong>Connect with Splitwise</strong>
    </Button>
  );
};
