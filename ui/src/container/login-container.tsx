import {Col, Container, Row} from "react-bootstrap";
import Login from "../component/login-component";
import {Outlet} from "react-router-dom";


export const LoginContainer = () =>
  (
    <Container fluid>
      <Row>
        <Col>
          <Login />


        </Col>
      </Row>
      <Row>
        <Col>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );


