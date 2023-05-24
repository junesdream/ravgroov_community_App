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
import {Link, useNavigate} from "react-router-dom";
import {DarkModeContext} from "../../context/darkModeContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {LogoutOutlined} from "@mui/icons-material";
import {toast} from "react-toastify";


type Props = {
    onLogout: () => Promise<void>
    userDetails: string | undefined
}

export default function Navbar(props: Props) {

    const {toggle, darkMode} = useContext(DarkModeContext);


  const [, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    async function logoutUser() {
        try {
            await props.onLogout();
            setIsLoggedIn(false);
            navigate("/landing");
            toast.success("Successfully logged out!")
        } catch (r) {
            console.error(r);
            toast.error("Couldn't log out: " + r)
        }
    }


    return (
        <div className="navBar">
            <div className="nav_left">
                <Link to="/" style={{textDecoration: "none"}}>
                    <span> RavGroov <br/> Communy </span>
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
               <AccountCircleIcon id="nav_right_icon" />
                <span>{props.userDetails} </span>
                <Link to="#" onClick={logoutUser} className="nav_right_logout">   <LogoutOutlined />  </Link>

            </div>

        </div>
    )
}
