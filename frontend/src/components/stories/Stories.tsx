import React, {useContext} from "react";
import './Stories.css'
import {AuthContext} from "../../context/authContext";

type Props = {
    userDetails: string | undefined
}


export default function Stories(props: Props) {

    //const {currentUser} = useContext(AuthContext)


    const stories = [
        {
            id: 1,
            name: "Ulla Schmickenuel",
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
              {/*<img src={currentUser.profilePic} alt="" />*/}
              <img src="https://images.pexels.com/photos/16821086/pexels-photo-16821086.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt="" />
                <span>{props.userDetails}</span>
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