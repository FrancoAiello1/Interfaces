import React from "react";
import {ExamplePosts, Post} from "../model/Post";
import comment from '../assets/icons/comment.png';
import {Button} from "react-bootstrap";
import {LikeIcon} from "./LikeIcon";
import {CommentComponent} from "./CommentComponent";

interface State {
    posts: Post[];
}

export class LastPostsComponent extends React.Component<any, State> {

    constructor(props: any) {
        super(props);
        this.state = {posts: ExamplePosts};
    }

    changeImg(post: Post, imgIndex: number) {
        const posts = [...this.state.posts];
        post.selectedImg = imgIndex;
        posts.splice(posts.indexOf(post), 1, post);
        this.setState({posts: posts});
    }

    setUserHasLiked(post: Post) {
        const posts = [...this.state.posts];
        post.userHasLiked = !post.userHasLiked;
        post.userHasLiked ? post.likes++ : post.likes--;
        if (post.userHasLiked && post.userHasDisliked) {
            post.userHasDisliked = false;
            post.dislikes--;
        }
        posts.splice(posts.indexOf(post), 1, post);
        this.setState({posts: posts});
    }

    setUserHasDisliked(post: Post) {
        const posts = [...this.state.posts];
        post.userHasDisliked = !post.dislikes;
        post.userHasDisliked ? post.dislikes++ : post.dislikes--;
        if (post.userHasDisliked && post.userHasLiked) {
            post.userHasLiked = false;
            post.likes--;
        }
        posts.splice(posts.indexOf(post), 1, post);
        this.setState({posts: posts});
    }

    render() {
        return (
            <>
                <div className={"d-flex justify-content-center mt-5"}>
                    <div>
                        <h5 className={"text-center"}>Ultimas publicaciones</h5>
                        {this.state.posts.map((post, index) => {
                            return (
                                <>
                                    <div className={"mt-5"}
                                         style={{border: "1px solid black", borderRadius: "10px", padding: "20px"}}>
                                        <div className={"d-flex align-items-center"}>
                                            <img src={post.postCreator.img} height={"50px"} width={"50px"}
                                                 style={{borderRadius: "50px"}}/>
                                            <p className={"m-lg-3"}>{post.postCreator.name}</p>
                                        </div>
                                        {post.imgs.length > 0 && 
                                            <img src={post.imgs[post.selectedImg]}
                                                style={{width: "100%", height: "500px"}}/>
                                        }

                                        <div className={"d-flex justify-content-center mt-2"}>
                                            {post.imgs.map((img, i) => {
                                                return (
                                                    <>
                                                        <div
                                                            className={"m-lg-1"}
                                                            style={{
                                                                width: "15px",
                                                                height: "15px",
                                                                borderRadius: "50px",
                                                                backgroundColor: i === post.selectedImg ? "#D42DD8" : "#444344",
                                                                cursor: "pointer"
                                                            }}
                                                            onClick={() => this.changeImg(post, i)}
                                                        >
                                                        </div>
                                                    </>
                                                )
                                            })}
                                        </div>
                                        <div className={"d-flex"}>
                                            <div style={{cursor: "pointer", width: "30px", marginRight: "10px"}}
                                                 onClick={() => this.setUserHasLiked(post)}>
                                                <LikeIcon fill={post.userHasLiked ? "#D42DD8" : undefined}/>
                                                <p>{post.likes}</p>
                                            </div>
                                            <div style={{cursor: "pointer", width: "30px"}}
                                                 onClick={() => this.setUserHasDisliked(post)}>
                                                <LikeIcon dislike fill={post.userHasDisliked ? "#D42DD8" : undefined}/>
                                                <p>{post.dislikes}</p>
                                            </div>
                                        </div>

                                        <p>{post.description}</p>

                                        {post.comments.map((comment, i) => {
                                            return (
                                                <CommentComponent comment={comment}/>
                                            )
                                        })}
                                        <div className={"d-flex align-items-center"} style={{width: "100%"}}>
                                            <img src={comment} height={"20px"} width={"20px"}/>
                                            <input placeholder={"Agregar un comentario..."}
                                                   style={{
                                                       borderRadius: "50px",
                                                       width: "100%",
                                                       marginLeft: "10px",
                                                       marginRight: "10px"
                                                   }}/>
                                            <Button style={{
                                                borderColor: "#D42DD8",
                                                borderRadius: "50px",
                                                backgroundColor: "#D42DD8"
                                            }}
                                            >Comentar</Button>

                                        </div>

                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>
            </>
        )
    }
}