import React from "react";
import './LandingPage.css';
import {Link} from "react-router-dom";




export default function LandingPage() {



    return (
        <div className="landing_page">

            <div className="landing_page_title">
            <h1> RavGroov <br/> Community</h1>

                <Link to="/register" style={{textDecoration:"none"}}>
                <h3> CLICK HERE</h3>
                </Link>
            </div>
        </div>
    )
}