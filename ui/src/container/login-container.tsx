import { Card, Col, Container, Row } from 'react-bootstrap';
import { LoginComponent } from '../component/login-component';

export const LoginContainer = () => (
  <Container>
    <Row className="justify-content-md-center align-content-md-center h-100">
      <Col xs={12} sm={12} md={6} lg={5} xl={4} xxl={3}>
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
