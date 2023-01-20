import {LoginComponent} from "../component/login-component";
import {Col, Container, Row} from "react-bootstrap";

export const LayoutContainer = () =>
    <>
        <Container fluid>
            <Row>
                <Col>
                    <LoginComponent />
                </Col>
            </Row>
        </Container>
    </>



