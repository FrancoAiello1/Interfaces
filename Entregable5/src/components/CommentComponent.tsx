import React from "react";
import {Comment} from "../model/Comment";

interface Props {
    comment: Comment;
}
export class CommentComponent extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <>
                <div className={"d-flex align-items-center"}>
                    <p style={{fontWeight: "bold"}}>{this.props.comment.userName}</p>
                    <p style={{marginLeft: "10px"}}>{this.props.comment.text}</p>
                </div>
            </>
        );
    }
}