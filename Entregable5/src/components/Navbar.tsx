import React from "react";
import home from '../assets/icons/home.png';
import chat from '../assets/icons/chats.png';
import lupa from '../assets/icons/lupa.png';
import logout from '../assets/icons/logout.png';
import account from '../assets/icons/account.png';
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export class Navbar extends React.Component<any, any> {

    render() {
        return (
            <>
                <Row style={{ borderBottom: "1px solid black", position: "sticky", zIndex: "2" }} className={"mt-3 pb-3"}>
                    <Col md={3}>
                        <Row>
                            <Col md="5" className="d-flex justify-content-around ">
                                <Link to="/" style={{textDecoration:"none"}}>
                                    <img src={home} width={"35px"} height={"35px"} />
                                </Link>
                                <Link to="/chats">
                                    <img src={chat} width={"35px"} height={"35px"} />
                                </Link>
                            </Col>
                            <Col md="7">
                                <div style={{ width: "100%", height: "30px" }} className={"d-flex justify-content-center"}>
                                    <Link to="/search" style={{position: "relative", left:"85%"}}>
                                        <img src={lupa} style={{cursor: "pointer", height: "24px", top: "3px" }} />
                                    </Link>
                                    <input placeholder={"Buscar en Petbook"} style={{ borderRadius: "50px", width: "100%", height: "100%" }} />
                                </div>

                            </Col>
                        </Row>
                    </Col>
                    <Col md={"6"}>
                        <Link to="/">
                            <h1 className={"text-center"} style={{ color: "#564E57" }}>Petbook</h1>
                        </Link>
                    </Col>
                    <Col md={3} className={"d-flex align-items-center justify-content-around"}>
                        <Row>
                            <Col md="7">
                                <div style={{ width: "100%", height: "30px" }} className={"d-flex justify-content-center hidden"}>

                                </div>
                            </Col>
                            <Col md="5" className="d-flex">
                                <img src={account} width={"35px"} height={"35px"} />
                                <Link to="/login">
                                    <img src={logout} width={"35px"} height={"35px"} />
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </>
        );
    }
}