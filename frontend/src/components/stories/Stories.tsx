import React, {useContext} from "react";
import './Stories.css'
import {AuthContext} from "../../context/authContext";

export default function Stories() {

    //const {currentUser} = useContext(AuthContext)


    const stories = [
        {
            id: 1,
            name: "Dora Park",
            img: "https://images.pexels.com/photos/13273107/pexels-photo-13273107.jpeg?auto=compress&cs=tinysrgb&w=1200",
        },
        {
            id: 2,
            name: "Emily Stewart",
            img: "https://images.pexels.com/photos/6131100/pexels-photo-6131100.jpeg?auto=compress&cs=tinysrgb&w=1200",
        },
        {
            id: 3,
            name: "Paul Schmidt",
            img: "https://images.pexels.com/photos/12642937/pexels-photo-12642937.jpeg?auto=compress&cs=tinysrgb&w=1200",
        },
        {
            id: 4,
            name: "Laura Akiko",
            img: "https://images.pexels.com/photos/2861883/pexels-photo-2861883.jpeg?auto=compress&cs=tinysrgb&w=1200",
        },
    ];


    return (
        <div className="stories">
            <div className="story">
                <img src="https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load" alt="" />
                <span>Laura Akiko</span>
                <button>+</button>
            </div>
            {stories.map(story=>(
                <div className="story" key={story.id}>
                    <img src={story.img} alt="" />
                    <span>{story.name}</span>
                </div>
            ))}

        </div>
    )
}