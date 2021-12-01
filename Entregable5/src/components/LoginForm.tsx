import React from "react";
import {Button, Col, Modal, Row} from "react-bootstrap";
import logo from '../assets/form-dogs.png';
import inputDog from '../assets/input-dog.png';
import {SignupForm} from "./SignupForm";
import { Link } from "react-router-dom";

interface State {
    showSignupModal: boolean;
}

export class LoginForm extends React.Component<{}, State> {

    constructor(props: any) {
        super(props);
        this.state = {showSignupModal: false};
    }

    render() {
        return (
            <>
                <div style={{marginTop: "10%"}}>
                    <Row className={"align-items-center"}>
                        <Col md="6">
                            <div className={"text-center"}>
                                <h1 style={{color: "#564E57"}}>Petbook</h1>
                                <img src={logo} width={"700px"} height={"500px"}/>

                            </div>
                        </Col>
                        <Col md="6" style={{width: "875px"}}>
                            <form style={{border: "1px solid #C7C7C7", borderRadius: "5px"}}>
                                <Row className="d-flex justify-content-center">
                                    <Col md="10" className={"mt-3"}>
                                        <label style={{position: "relative", top: "40px"}}>Correo electronico</label>
                                        <img src={inputDog} height={"100px"}
                                             style={{position: "relative", left: "450px", top: "15px"}}/>
                                        <input
                                            type="text"
                                            placeholder="Correo electronico"
                                            style={{
                                                border: '1px solid grey',
                                                borderRadius: '10px',
                                                width: "100%",
                                                height: "40px"
                                            }}
                                        />
                                    </Col>
                                    <Col md="10" className={"mt-3"}>
                                        <label>Contraseña</label>
                                        <input
                                            type="password"
                                            placeholder="Contraseña"
                                            style={{
                                                border: '1px solid grey',
                                                borderRadius: '10px',
                                                width: "100%",
                                                height: "40px"
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="d-flex justify-content-center mt-3">
                                    <Col md={"10"}>
                                    <Link to="/">
                                        <Button style={{width: "100%", borderRadius: "10px"}}>Iniciar sesion</Button>
                                    </Link>
                                    </Col>
                                    <Col md={"10"} className={"mt-3 d-flex justify-content-center"}>
                                        <p style={{color: "#63C7FF", cursor: "pointer"}}>¿Olvidaste tu contraseña?</p>
                                    </Col>
                                    <Col md={"10"} className={"d-flex justify-content-center mb-3"}>
                                        <Button style={{
                                            borderColor: "#D42DD8",
                                            borderRadius: "10px",
                                            backgroundColor: "#D42DD8"
                                        }} onClick={() => this.setState({showSignupModal: true})}>Crear cuenta
                                            nueva</Button>
                                    </Col>
                                </Row>
                            </form>
                        </Col>
                    </Row>

                </div>
                <Modal size={"lg"} show={this.state.showSignupModal}>
                    <div className={"d-flex justify-content-end"} style={{width: "100%"}}>
                        <p style={{cursor: "pointer", marginRight: "20px"}}
                           onClick={() => this.setState({showSignupModal: false})}>X</p>
                    </div>
                    <div>
                        <h2 style={{marginLeft: "70px", color: "#5E5C5C"}}>Registrate</h2>
                    </div>
                    <SignupForm/>

                </Modal>
            </>
        )
    }
}