import { Outlet } from 'react-router-dom';
import {Button, Col, Container, Row} from "react-bootstrap";
import {HeaderComponent} from "../component/header-component";

export const LayoutContainer = () => (
  <Container fluid>
    <Row>
      <Col>
        <HeaderComponent />
        <Button variant="info">Primary</Button>{' '}
      </Col>
    </Row>
    <Row>
      <Col>
        <Outlet />
      </Col>
    </Row>
  </Container>


);
