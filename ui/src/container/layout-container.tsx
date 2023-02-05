import { Outlet } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import { HeaderComponent } from '../component/header-component';
import { FooterComponent } from '../component/footer-component';
import style from './layout-container.module.scss';

export const LayoutContainer = () => (
  <Container className={style.mainContainer}>
    <Row>
      <HeaderComponent />
    </Row>
    <Row className={style.contentContainer}>
      <Outlet />
    </Row>
    <Row className={style.footerContainer}>
      <FooterComponent />
    </Row>
  </Container>
);
