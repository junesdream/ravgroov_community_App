import React from "react";
import "./Leftbar.css";
import Friends from "../../assets/1.png"
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";


export default function LeftBar() {

    //const { currentUser } = useContext(AuthContext);

    return (
        <div className="leftBar">
            <div className="left_container">
                <div className="left_menu">
                    <div className="left_user">
                        <img  src="https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&w=1200" alt=" "/>
                        <span>Dora Park</span>
                    </div>
                    <div className="left_item">
                        <img src={Friends} alt=" "/>
                        <span> Friends</span>
                    </div>
                    <div className="left_item">
                        <img src={Groups} alt=" "/>
                        <span>Groups</span>
                    </div>
                    <div className="left_item">
                        <img src={Market} alt=" "/>
                        <span>Marketplace</span>
                    </div>
                    <div className="left_item">
                        <img src={Watch} alt=" "/>
                        <span>Watch</span>
                    </div>
                    <div className="left_item">
                        <img src={Memories} alt=" "/>
                        <span>Memories</span>
                    </div>
                </div>
                <hr />
                <div className="left_menu">
                    <span>Your shortcuts</span>
                    <div className="left_item">
                        <img src={Events} alt="" />
                        <span>Events</span>
                    </div>
                    <div className="left_item">
                        <img src={Gaming} alt="" />
                        <span>Gaming</span>
                    </div>
                    <div className="left_item">
                        <img src={Gallery} alt="" />
                        <span>Gallery</span>
                    </div>
                    <div className="left_item">
                        <img src={Videos} alt="" />
                        <span>Videos</span>
                    </div>
                    <div className="left_item">
                        <img src={Messages} alt="" />
                        <span>Messages</span>
                    </div>
                </div>
                <hr />
                <div className="left_menu">
                <span>Others</span>
                    <div className="left_item">
                        <img src={Fund} alt="" />
                        <span>Fundraiser</span>
                    </div>
                    <div className="left_item">
                        <img src={Tutorials} alt="" />
                        <span>Tutorials</span>
                    </div>
                    <div className="left_item">
                        <img src={Courses} alt="" />
                        <span>Courses</span>
                    </div>
                </div>
            </div>
        </div>
    )

}