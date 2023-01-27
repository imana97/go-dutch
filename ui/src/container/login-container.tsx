import {Card, Col, Container, Row} from "react-bootstrap";
import {LoginComponent} from "../component/login-component";


export const LoginContainer = () =>
  (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={5}>
          <Card>
            <Card.Header>Login</Card.Header>
            <Card.Body><LoginComponent /></Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );


