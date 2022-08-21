import React from "react";
import { useHistory } from "react-router-dom";
const Bar=()=>{
    const history=useHistory();
    const goToMain=()=>{
        history.push("/");
    }
    return(
        <div className="m-3">
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <button className="btn btn-success" onClick={goToMain}>Go to Home</button>
                </li>
            </ul>
        </div>
    )
}

export default Bar;