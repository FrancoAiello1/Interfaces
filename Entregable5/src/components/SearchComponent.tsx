import React from "react";
import { Col, Row } from "react-bootstrap";
import { SearchResult, SearchResultExample } from "../model/SearchResult";
import location from '../assets/icons/location.png';
import Button from "@restart/ui/esm/Button";

interface State {
    selectedTab: number;
}

export class SearchComponent extends React.Component<any, State> {

    constructor(props: any) {
        super(props);
        this.state = { selectedTab: 0 };
    }

    getBackgroundColor(index: number) {
        return this.state.selectedTab === index ? "#564E57" : "#C4C4C4";
    }

    getColor(index: number) {
        return this.state.selectedTab === index ? "white" : "black";
    }

    results: SearchResult[] = SearchResultExample;

    render() {
        return (
            <>
                <div style={{ border: "1px solid black", width: "80%" }} className="mt-5">
                    <Row style={{ width: '100%', margin: "0px", borderBottom: "1px solid #D42DD8" }} className="text-center">
                        <Col
                            md="4"
                            style={{ backgroundColor: this.getBackgroundColor(0), cursor: "pointer", color: this.getColor(0) }}
                            onClick={() => this.setState({ selectedTab: 0 })}
                        >
                            <p>Todo</p>
                        </Col>
                        <Col
                            md="4"
                            style={{ borderLeft: "2px solid #D42DD8", backgroundColor: this.getBackgroundColor(1), cursor: "pointer", color: this.getColor(1) }}
                            onClick={() => this.setState({ selectedTab: 1 })}
                        >
                            <p>Amigos</p>
                        </Col>
                        <Col
                            md="4"
                            style={{ borderLeft: "2px solid #D42DD8", backgroundColor: this.getBackgroundColor(2), cursor: "pointer", color: this.getColor(2) }}
                            onClick={() => this.setState({ selectedTab: 2 })}
                        >
                            <p>Profesionales</p>
                        </Col>
                    </Row>
                    {this.results.map((result, index) => {
                        return (
                            <>
                                <Row key={index} style={{ borderBottom: "1px solid #D42DD8" }} className="p-2 m-0">
                                    <Col md="6" className="d-flex align-items-center">
                                        <div>
                                            <img src={result.user.img} width="80px" height="80px" style={{ borderRadius: "50px", cursor: "pointer" }} />
                                        </div>
                                        <div style={{ marginLeft: "5%" }}>
                                            <p className="m-0">{result.user.name}</p>
                                            <div className="d-flex align-items-center">

                                                <img src={location} width="20px" height="20px" />
                                                <p className="m-0" style={{ color: "black", fontSize: "12px" }}>{result.city}</p>
                                            </div>
                                            <p className="m-0" style={{ color: "#564E57", fontSize: "12px" }}>{result.user.friends} amigos</p>
                                        </div>
                                    </Col>
                                    <Col md="6" className="d-flex justify-content-end align-items-center">
                                        <Button style={{ backgroundColor: "#D42DD8", color: "black", borderRadius: "30px", border: "none", width: "40%", height: "40px" }}>Seguir</Button>
                                    </Col>
                                </Row>
                            </>
                        )
                    })}
                </div>
            </>
        )
    }
}