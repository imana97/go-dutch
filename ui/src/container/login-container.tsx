import { Card, Col, Container, Row, Stack } from 'react-bootstrap';
import { SplitwiseLoginComponent } from '../component/splitwise-login-component';
import { LoginComponent } from '../component/login-component';

export const LoginContainer = () => (
  <Container className="h-100">
    <Row className="justify-content-md-center align-content-md-center h-100">
      <Col md={6}>
        <Card bg="light">
          <Card.Header>Login</Card.Header>
          <Card.Body>
            <Stack gap={3}>
              <div>
                <Card.Title>Connect with Splitwise</Card.Title>
                <p className="text-warning">
                  To get all of the features, it is recommended to connect with
                  splitwise.
                </p>
              </div>
              <div className="text-center">
                <SplitwiseLoginComponent />
              </div>
              <hr />
              <Card.Title>Or login with your Go Dutch account</Card.Title>
              <LoginComponent />
            </Stack>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);
