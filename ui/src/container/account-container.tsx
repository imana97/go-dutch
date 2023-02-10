import { Card, Col, Container, Row } from 'react-bootstrap';
import { AccountComponent } from '../component/account-component';

export const AccountContainer = () => (
  <Container className="h-100">
    <Row className="justify-content-md-center align-content-md-center h-100">
      <Col md={7}>
        <Card bg="light">
          <Card.Header as={'h5'}>Account</Card.Header>
          <Card.Body>
            <AccountComponent />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);
