import React from "react";
import Pagina from "./Pagina";

const Disco = ({ nPaginas }) => {
    const pgs = []
    for (let i = 0; i < nPaginas; i++) {
        pgs.push(i);
    }
    return (
        <div className="disco"> 
        <div className="top-ellipse"></div>
        <div className="paginas">
            {
                pgs.map(
                    (pg) => (
                        <Pagina numero={pg}
                        />
                    )
                )
            }                   
        </div>
        <div className="bottom-ellipse"></div>
        </div>
    )
};

export default Disco;
