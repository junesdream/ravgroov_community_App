import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import LeftBar from '../leftbar/LeftBar';
import RightBar from '../rightbar/RightBar';
import './Layout.css';
import { DarkModeContext } from '../../context/darkModeContext';


type Props = {
    logoutUser: () => Promise<void>;
    userDetails: string | undefined;
};

export default function Layout(props: Props) {
    const { darkMode } = useContext(DarkModeContext);

    return (
        <div className={`theme-${darkMode ? 'dark' : 'light'}`}>
            <Navbar onLogout={props.logoutUser} userDetails={props.userDetails} />
            <div style={{ display: 'flex' }}>
                <LeftBar userDetails={props.userDetails} />
                <div style={{ flex: 6 }}>
                    <Outlet />
                </div>
                <RightBar />
            </div>
        </div>
    );
}

