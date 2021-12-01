import React from "react";
import {Col, Row} from "react-bootstrap";
import {PublicidadComponent} from "./PublicidadComponent";
import {RecommendedUsers} from "./RecommendedUsers";
import {LastPostsComponent} from "./LastPostsComponent";
import { SearchComponent } from "./SearchComponent";

interface Props {
    isSearchPage?: boolean;
}

export class Home extends React.Component<Props, any> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <>
                <Row>
                    <Col md={3}>
                        <PublicidadComponent/>
                    </Col>
                    <Col md={6}>
                        { this.props.isSearchPage ? 
                            <SearchComponent/>
                            :    
                            <LastPostsComponent/>
                        }
                    </Col>
                    <Col md={3}>
                        <RecommendedUsers/>

                    </Col>
                </Row>
            </>
        );
    }
}

