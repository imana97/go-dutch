import { Alert, Button, Form } from 'react-bootstrap';
import { userStore } from '../store';
import { observer } from 'mobx-react';
import { Link, useNavigate } from 'react-router-dom';
import Parse from 'parse';

export const LoginComponent = observer(() => {
  const navigate = useNavigate();

  const handleLogin = () => {
    userStore
      .login(userStore.email, userStore.password)
      .then((user) => {
        userStore.clearSignUpForm();
        navigate('/', { replace: true });
      })
      .catch();
  };

  return (
    <>
      {userStore.errorMessage.length !== 0 ? (
        <Alert
          variant="danger"
          dismissible
          onClose={() => {
            userStore.clearError();
          }}
        >
          {userStore.errorMessage}
        </Alert>
      ) : null}

      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group className="mb-3" controlId="form-username">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={userStore.email}
            onChange={(event) => userStore.setEmail(event.target.value)}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="form-password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={userStore.password}
            onChange={(event) => userStore.setPassword(event.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="button" onClick={() => handleLogin()}>
          Login
        </Button>

        <Form.Group>
          <hr />
          <Form.Text>
            Don't have an account? <Link to="/sign-up">Create an account</Link>
          </Form.Text>
          <br />
          <Form.Text>
            <Link to="/password-reset">Forgot my password</Link>
          </Form.Text>
        </Form.Group>
      </Form>
    </>
  );
});
