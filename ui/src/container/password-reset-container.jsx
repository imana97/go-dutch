import { Card, Col, Container, Row } from 'react-bootstrap';
import { PasswordResetComponent } from '../component/password-reset-component';

export const PasswordResetContainer = () => (
  <Container className="h-100">
    <Row className="justify-content-md-center align-content-md-center h-100">
      <Col md={5}>
        <Card bg="light">
          <Card.Header as="h5">Password Reset</Card.Header>
          <Card.Body>
            <PasswordResetComponent />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);
