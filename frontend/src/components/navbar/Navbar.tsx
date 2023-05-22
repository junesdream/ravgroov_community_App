import React, {useContext, useState} from "react";
import "./Navbar.css";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import NotificationsLogoutIcon from '@mui/icons-material/LogoutOutlined';
import {Link, useNavigate} from "react-router-dom";
import {DarkModeContext} from "../../context/darkModeContext";
import {AuthContext} from "../../context/authContext";
import {LogoutOutlined} from "@mui/icons-material";
import useUser from "../../useUser";
import {User} from "../../model/User";
import {toast} from "react-toastify";


export default function Navbar() {

    const {toggle, darkMode} = useContext(DarkModeContext);
    //const {currentUser} = useContext(AuthContext);
    const {user} = useUser();


    return (
        <div className="navBar">
            <div className="nav_left">
                <Link to="/" style={{textDecoration: "none"}}>
                    <span> RavGroov </span>
                </Link>
                <HomeOutlinedIcon/>
                {darkMode ? <WbSunnyOutlinedIcon onClick={toggle}/> : <DarkModeOutlinedIcon onClick={toggle}/>}
                <GridViewOutlinedIcon/>
                <div className="nav_search">
                    <SearchOutlinedIcon/>
                    <input type="text" placeholder="Search..."/>
                </div>
            </div>
            <div className="nav_right">
                <PersonOutlinedIcon />
                <EmailOutlinedIcon />
                <NotificationsOutlinedIcon />

            {/*    {currentUser && (
                    <>
                        <img src={currentUser.profilePic} alt=" " />
                        <span>{currentUser.name}</span>
                    </>
                )}*/}

                {user}
                <Link to="/login" style={{textDecoration:"none", color:"springgreen" }}>
                <LogoutOutlined />
                    </Link>

            </div>
        </div>
    )

}
