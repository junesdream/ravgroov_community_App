import React, {useContext} from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../navbar/Navbar";
import LeftBar from "../leftbar/LeftBar";
import RightBar from "../rightbar/RightBar";
import './Layout.css';
import {DarkModeContext} from "../../context/darkModeContext";
import useUser from "../../useUser";



export default function Layout() {

    const {darkMode} = useContext(DarkModeContext);

    return (
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
            <Navbar />
            <div style={{ display: "flex" }}>
                <LeftBar />
                <div style={{ flex: 6 }}>
                    <Outlet />
                </div>
                <RightBar />
            </div>
        </div>
    );
}


