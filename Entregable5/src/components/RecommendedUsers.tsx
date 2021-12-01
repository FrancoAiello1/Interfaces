import React from "react";
import {RecommendedUser} from "../model/RecommendedUser";
import dee from '../assets/dee.jpeg';
import romero from '../assets/romero.jpeg';
import cesar from '../assets/cesar.jpeg';

export class RecommendedUsers extends React.Component<any, any> {

    users: RecommendedUser[] = [
        {
            name: "Dee Thornell",
            friends: 746,
            img: dee
        },
        {
            name: "Juan Romero",
            friends: 329,
            img: romero
        },
        {
            name: "Cesar Milan",
            friends: 1297,
            img: cesar
        },

    ];

    render() {
        return (
            <>
                <div className={"mt-5"}>
                    <h3 style={{color: "#564E57"}}>Usuarios recomendados</h3>
                    {this.users.map((user, index) => {
                        return (
                            <>
                                <div className={"d-flex align-items-center"} style={{color: "#564E57"}}>
                                    <img src={user.img} height={"50px"} width={"50px"} style={{borderRadius: "50px"}}/>
                                    <div className={"m-lg-3"}>
                                        <p className={"mb-0"}>{user.name}</p>
                                        <p className={"mb-0"}>{user.friends} amigos</p>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </>
        )
    }
}