import { Card, Col, Container, Row } from 'react-bootstrap';
import { LoginComponent } from '../component/login-component';

export const LoginContainer = () => (
  <Container className="h-100">
    <Row className="justify-content-md-center align-content-md-center h-100">
      <Col md={5}>
        <Card>
          <Card.Header>Login</Card.Header>
          <Card.Body>
            <LoginComponent />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);
