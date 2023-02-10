import { Alert, Button, Form } from 'react-bootstrap';
import { userStore } from '../store';
import { observer } from 'mobx-react';
import { Link, useNavigate } from 'react-router-dom';

export const SignUpComponent = observer(() => {
  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === true) {
      userStore
        .signUp(userStore.name, userStore.email, userStore.password)
        .then((user) => {
          // clear the form
          userStore.clearSignUpForm();
          // hide validation errors for a fresh start.
          userStore.setSignUpValidated(false);

          // redirect the user to the home page
          navigate('/', { replace: true });
        })
        .catch();
    }
    // show errors if any.
    userStore.setSignUpValidated(true);
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

      <Form
        noValidate
        validated={userStore.signUpValidated}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3" controlId="form-name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            value={userStore.name}
            onChange={(event) => userStore.setName(event.target.value)}
            type="text"
            placeholder="Enter your name e.g., John Doe"
            isInvalid={userStore.name.length < 3}
            isValid={userStore.name.length >= 3}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please enter a name longer than 3 letters.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="form-email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            value={userStore.email}
            onChange={(event) => userStore.setEmail(event.target.value)}
            type="email"
            placeholder="Enter email"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please enter a valid email address.
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="form-password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            value={userStore.password}
            onChange={(event) => userStore.setPassword(event.target.value)}
            type="password"
            placeholder="Password"
            isInvalid={userStore.password !== userStore.confirmPassword}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Passwords do not match.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="form-confirm-password">
          <Form.Label>Confirm Passowrd</Form.Label>
          <Form.Control
            required
            value={userStore.confirmPassword}
            onChange={(event) =>
              userStore.setConfirmPassword(event.target.value)
            }
            type="password"
            placeholder="Confirm Password"
            isInvalid={userStore.password !== userStore.confirmPassword}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Passwords do not match.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={userStore.loading}>
          Sign up
        </Button>

        <Form.Group>
          <hr />
          <Form.Text>
            Already have an account? <Link to="/login">Sign in here</Link>
          </Form.Text>
          <br />
        </Form.Group>
      </Form>
    </>
  );
});
