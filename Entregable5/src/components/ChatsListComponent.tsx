import React from "react";
import { Col, Row } from "react-bootstrap";
import { Chat, DefaultChats } from "../model/chat/Chat";
import { ChatComponent } from "./ChatComponent";

interface State {
    chats: Chat[];
    selectedChat: Chat;

}

export class ChatsListComponent extends React.Component<any, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            chats: DefaultChats,
            selectedChat: DefaultChats[0]
        };
    }

    getLastMessage(chat: Chat) {
        let message = chat.messages[chat.messages.length - 1].text;
        if (message.length > 40) {
            message = message.slice(0, 39) + "..."
        }
        return message;
    }

    render() {
        return (
            <>
                <div>
                    <Row>
                        <Col md={3} style={{paddingRight: "0px", overflow:"scroll", maxHeight:"800px"}}>
                            <div>
                                {this.state.chats.map((chat, index) => {
                                    return (
                                        <>
                                            <div key={index}
                                                className="d-flex align-items-center"
                                                style={{
                                                    borderBottom: "1px solid #D42DD8",
                                                    padding: "10px",
                                                    borderRight: "1px solid #564E57",
                                                    height: "136px",
                                                    cursor: "pointer",
                                                    backgroundColor: this.state.selectedChat === chat ? "#D8D9D9" : "" }}
                                                    onClick={() => this.setState({selectedChat: chat})}
                                                    >
                                                <img src={chat.user.img} style={{ width: "60px", height: "60px", borderRadius: "50px" }} />
                                                <div style={{ marginLeft: "10px", width: "100%" }} className={"d-flex align-items-center justify-content-between"}>
                                                    <div>
                                                        <p style={{ marginBottom: "2px" }}>{chat.user.name}</p>
                                                        <p style={{ color: "#858585" }}>{this.getLastMessage(chat)}</p>
                                                    </div>
                                                    <p style={{ color: "#564E57", fontSize: "15px" }}>{chat.messages[chat.messages.length - 1].time}</p>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </Col>
                        <Col md={9} style={{paddingLeft: "0px"}}>
                            <ChatComponent chat={this.state.selectedChat}/>
                        </Col>
                    </Row>
                </div>
            </>
        )
    }
}