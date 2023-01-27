import { Card, Col, Container, Row } from 'react-bootstrap';

export const AccessControlContainer = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Header as="h5">Access Control</Card.Header>
            <Card.Body>access control content here</Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
