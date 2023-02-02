import { Col, Container, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { EventComponent } from '../component/event-component';

export const EventGroupContainer = () => {
  return (
    <Container>
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
  );
};
