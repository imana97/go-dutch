import { Col, Container, Row} from "react-bootstrap";
import {Outlet} from "react-router-dom";
import {EventComponent} from "../component/event-component";

export const EventsContainer=()=>{
  return (
    <Container fluid>
      <Row>
        <Col>
          <EventComponent />
          {/*<Button variant="info">Primary</Button>{' '}*/}
        </Col>
      </Row>
      <Row>
        <Col>
          <Outlet />
        </Col>
      </Row>
    </Container>

  )
};
