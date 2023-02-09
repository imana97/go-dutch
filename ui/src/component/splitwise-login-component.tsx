import { Button } from 'react-bootstrap';
import { userStore } from '../store';

export const SplitwiseLoginComponent = () => (
  <Button onClick={(event) => userStore.redirectToSplitwise()}>
    Login with Splitwise
  </Button>
);
