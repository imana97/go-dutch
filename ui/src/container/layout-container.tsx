import { Outlet } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { HeaderComponent } from '../component/header-component';
import { FooterComponent } from '../component/footer-component';
import style from './layout-container.module.scss';

export const LayoutContainer = () => (
  <Container className={style.mainContainer} fluid>
    <Row>
      <HeaderComponent />
    </Row>
    <Row className={style.contentContainer}>
      <Col>
        <Outlet />
      </Col>
    </Row>
    <Row className={style.footerContainer}>
      <Col>
        <FooterComponent />
      </Col>
    </Row>
  </Container>
);
