import React from "react";
import sappia from '../assets/sappia.png';
import {Publicidad} from "../model/Publicidad";
import gatti from '../assets/gatti.jpeg';

export class PublicidadComponent extends React.Component<any, any> {
    publicidades: Publicidad[] = [
        {
            img: sappia
        },
        {
            img: gatti
        }
    ];


    render () {
        return (
            <>
                <div style={{marginLeft: "50px"}} className={"mt-5"}>
                    <h3 style={{color: "#564E57"}}>Publicidad</h3>
                    {this.publicidades.map((publicidad, index) => {
                        return (
                            <>
                                <div style={{border: "1px solid black", width: "75%", borderRadius: "20px", padding:"40px"}} className={"d-flex justify-content-center mt-5"}>
                                    <img src={publicidad.img} width="100%" height="100%" style={{cursor: "pointer"}}/>
                                </div>
                            </>
                        )
                    })}
                </div>
            </>
        )
    }
}