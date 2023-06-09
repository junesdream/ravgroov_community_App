import React, {useEffect, useState} from "react";
import "./PostDetail.css"
import {Post} from "../../model/Post";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";

type Props = {
    deletePost: (id: string) => void
}

export default function PostDetail(props: Props) {

    const [post, setPost] = useState<Post>();
    const {id} = useParams<{ id: string }>()


    useEffect(() => {
        if (id) {
            loadPostById(id);
        }
        //eslint-disable-next-line
    }, [])

    function loadPostById(id: string) {
        axios.get('/api/posts/' + id)
            .then((response) => {
                setPost(response.data)
            })
            .catch((r) => {
                console.error("Post not found" + r)
            })
    }

    const navigate = useNavigate();

    function onDeleteClick() {

        if (post) {
            props.deletePost(post.id)
            navigate("/posts/add")
        }
    }


    return (
        <div className="post_detail">

            <div className="profile_images">
                <img
                    src="https://images.pexels.com/photos/11001338/pexels-photo-11001338.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
                    alt=""
                    className="cover"
                />
                <img
                    src="https://images.pexels.com/photos/16756722/pexels-photo-16756722.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
                    alt="DJ"
                    className="profilePic"
                />
            </div>

            <div className="profile_container">
                <div className="detail_profile_info">

                    <div className="profile_center">
                        {
                            post
                                ?
                                <span className="profile_center_name">{post.userName}</span>
                                : <div>Loading...</div>
                        }

                        <div className="profile_center_info">
                            <div className="profile_center_item">
                                <PlaceIcon/>
                                <span>Canada</span>
                            </div>
                            <div className="profile_center_item">
                                <LanguageIcon/>
                                <span>RA</span>
                            </div>
                        </div>
                        <button>Follow</button>
                        <span>My Messages</span>
                    </div>
                </div>
            </div>

            <div className="post_detail_container">
                {
                    post
                        ? <div className="post_detail-content">
                            <p>{post.title}</p>
                            <p>{post.userName}</p>
                            <p>{post.description}</p>
                            <img src={post.url} alt=""/>
                            <p>{post.like}</p>
                        </div>

                        : <div>Loading...</div>
                }

            </div>

            <div className="detail-content_btn">
            <Link to={
                post ? "/posts/update/" + post.id : "/"}>
                <button> Edit</button>
            </Link>
            <button onClick={onDeleteClick}>Delete</button>
        </div>


        </div>
    )
}
