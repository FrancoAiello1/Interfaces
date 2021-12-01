import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export class SignupForm extends React.Component<any, any> {

    render() {
        return (
            <form>
                <Row className="d-flex justify-content-center">
                    <Col md="10" className={"mt-3"}>
                        <label>Nombre</label>
                        <input
                            type="text"
                            placeholder="Nombre"
                            style={{ border: '1px solid grey', borderRadius: '10px', width: "100%", height: "40px" }}
                        />
                    </Col>
                    <Col md="10" className={"mt-3"}>
                        <label>Apellido</label>
                        <input
                            type="text"
                            placeholder="Apellido"
                            style={{ border: '1px solid grey', borderRadius: '10px', width: "100%", height: "40px" }}
                        />
                    </Col>
                    <Col md="10" className={"mt-3"}>
                        <label>Correo electronico</label>
                        <input
                            type="text"
                            placeholder="Correo electronico"
                            style={{ border: '1px solid grey', borderRadius: '10px', width: "100%", height: "40px" }}
                        />
                    </Col>
                    <Col md="10" className={"mt-3"}>
                        <label>Contraseña</label>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            style={{ border: '1px solid grey', borderRadius: '10px', width: "100%", height: "40px" }}
                        />
                    </Col>

                </Row>
                <Row className="d-flex justify-content-center mt-3">
                    <Col md={"10"} className={"d-flex justify-content-center mb-3"}>
                        <Link to="/">
                            <Button style={{ borderColor: "#D42DD8", borderRadius: "10px", backgroundColor: "#D42DD8" }}
                                onClick={() => this.setState({ showSignupModal: false })}>Registrarse</Button>
                        </Link>
                    </Col>
                </Row>
            </form>
        );
    }
}