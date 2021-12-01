import React from "react";
import { Col, Row } from "react-bootstrap";
import { Chat } from "../model/chat/Chat";
import send from '../assets/icons/send.png';
import clip from '../assets/icons/clip.png';
import face from '../assets/icons/face.png';
interface Props {
    chat: Chat;
}

export class ChatComponent extends React.Component<Props, any> {

    constructor(props: Props) {
        super(props);
    }

    render () {
        return (
            <>
                <div className="d-flex align-items-center" style={{borderBottom: "1px solid #564E57", padding:"20px", height:"136px"}}>
                    <img src={this.props.chat.user.img} style={{width: "100px", height:"100px", borderRadius:"50px"}} />
                    <h3 style={{marginLeft: "20px"}}>{this.props.chat.user.name}</h3>
                </div>
                <div style={{paddingLeft: "20px", overflow:"scroll", maxHeight:"500px"}}>
                   {this.props.chat.messages.map((message, index) => {
                       return (
                           <>
                            <div
                                className={"mt-5 d-flex align-items-center p-2 d-flex justify-content-between align-items-center"}
                                style={{backgroundColor: message.author ? "#D42DD8" : "#858585", color:"white", position: "relative", left:message.author ? "70%" : "0px", minHeight:"40px",  maxWidth:"400px", borderRadius:"10px"}}
                            >
                                <div>
                                      {message.text} 
                                </div>
                             <p style={{fontSize:"12px", color: "#564E57", marginBottom: "0px"}}>
                                {message.time}
                             </p>
                              
                            </div>
                           </>
                       )
                   })} 
                </div>
                <div style={{borderTop: "1px solid #D42DD8", position:"absolute", top:"81.4%", width:"75%", height:"10px"}}>
                    <Row className="mt-5">
                        <Col md="3" className="d-flex justify-content-center">
                            <div>
                                <img style={{marginRight:"30px"}} src={face} width="35px" height="35px"/>
                                <img src={clip} width="35px" height="35px"/>

                            </div>
                        </Col>
                        <Col md="6">
                            <input placeholder="Escriba un  mensaje..." style={{borderRadius:"10px", width:"70%", height:"40px"}}/>
                        </Col>
                        <Col md="3" className="d-flex justify-content-end" style={{paddingRight:"5%"}}>
                            <img src={send} width="35px" height="35px"/>
                        </Col>
                    </Row>
                </div>
            </>
        )
    }

}