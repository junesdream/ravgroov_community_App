import React, {useEffect, useState} from "react";
import "./PostDetail.css"
import {Post} from "../../model/Post";
import {useParams} from "react-router-dom";
import axios from "axios";


export default function PostDetail() {

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

    return (
        <div className="post_detail">
            {
                post
                    ? <div className="detail-content">
                        <p>{post.id}</p>
                        <p>{post.title}</p>
                        <p>{post.userName}</p>
                        <p>{post.postImg}</p>
                        <p>{post.description}</p>
                        <p>{post.like}</p>
                    </div>
                    : <div>Loading...</div>
            }
        </div>
    )
}
