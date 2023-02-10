import { Card, Col, Container, Row } from 'react-bootstrap';
import { SignUpComponent } from '../component/sign-up-component';

export const SignUpContainer = () => (
  <Container className="h-100">
    <Row className="justify-content-md-center align-content-md-center h-100">
      <Col md={5}>
        <Card bg="light">
          <Card.Header>Sign Up</Card.Header>
          <Card.Body>
            <SignUpComponent />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);
