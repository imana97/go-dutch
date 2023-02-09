import { Col, Container, Row } from 'react-bootstrap';

export const PageNotFoundContainer = () => (
  <Container className="h-100">
    <Row className="justify-content-md-center align-content-md-center h-100">
      <Col md={5} className="text-center">
        <h1>Whoops!</h1>
        <h4>404 Page Not Found</h4>
        <hr />
        <p>
          The page you're looking for does not exist. Try our{' '}
          <a href="#/">homepage</a> instead.
        </p>
      </Col>
    </Row>
  </Container>
);
