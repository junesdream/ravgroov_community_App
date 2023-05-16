import React, {useState} from "react";
import {Post} from "../../model/Post";
import "./PostCard.css"
import {Link, useNavigate} from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Comments from "../comments/Comments";

type Props = {
    post: Post
    deletePost: (id: string) => void
}

export default function PostCard(props: Props) {

    const navigate = useNavigate()

    function onDeleteClick() {
        props.deletePost(props.post.id)
    }

    const [commentOpen, setCommentOpen] = useState(false);

    const liked = true;

    return (
        <div className='post_card'>
            <div className="post_container">
                <div className="post_user">
                    <div className="post_userInfo">
                        {/*<img src={props.post.profilePic} alt="" />*/}
                        <img
                            src=" https://images.pexels.com/photos/458381/pexels-photo-458381.jpeg?auto=compress&cs=tinysrgb&w=1200"
                            alt=""/>
                        <div className="post_details">
                            <Link
                                to={`/profile/${props.post.id}`}
                                style={{textDecoration: "none", color: "inherit"}}
                            >
                                <span className="post_name">{props.post.title}</span>
                            </Link>
                            <span className="post_date">1 min ago</span>
                        </div>
                    </div>
                    <MoreHorizIcon/>
                </div>
                <div className="post_content">
                    <p>{props.post.description}</p>
                    <img src={props.post.url} alt=""/>
                </div>
                <div className="post_info">
                    <div className="post_item">
                        {liked ? <FavoriteOutlinedIcon style={{color: "red" }}/> : <FavoriteBorderOutlinedIcon/>}
                        12 Likes
                    </div>
                    <div className="post_item" onClick={() => setCommentOpen(!commentOpen)}>
                        <TextsmsOutlinedIcon/>
                        12 Comments
                    </div>
                    <div className="post_item">
                        <ShareOutlinedIcon/>
                        Share
                    </div>
                    <div className="post_card-btn">
                        <button onClick={() => {
                            navigate('/posts/' + props.post.id)
                        }}>Detail
                        </button>
                        <button onClick={onDeleteClick}>Delete</button>
                    </div>
                </div>
                {commentOpen && <Comments/>}
            </div>
        </div>
    )
}

