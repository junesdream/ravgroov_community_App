import {Post} from "../../model/Post";
import "./UpdatePost.css"
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";


type UpdatePostProps = {
    updatePost: (newPost: Post) => void
}

export default function UpdatePost(props: UpdatePostProps) {

    const initialState: Post = {id: "", title: "Spring Rite", userName: "oy World", postImg: "", description: "Spring break up and everything is grrowing!", profilePic: "", like: true, url: ""}

    const [post, setPost] = useState<Post>(initialState)
    const {id} = useParams<{ id: string }>()

    useEffect(() => {
        if (id) {
            loadPostById(id)
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


    function onSavePost(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (id) {
            props.updatePost(post);
            navigate("/posts")
        }
    }

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        const name: string = event.target.name;
        const value: string = event.target.value;
        if (id) {
            setPost(
                {...post, id: id, [name]: value}
            )
        }
    }

    return (
        <div className="update_post">
            <form className="update_input" onSubmit={onSavePost}>
                <input className="update_postTitle" type="text" name="title" placeholder={post.title} value={post.title}
                       onChange={onChange}/>
                <input className="update_postUsername" type="text" name="userName" placeholder={post.userName} value={post.userName}
                       onChange={onChange}/>
                <input className="update_postPostimg" type="text" name="postImg" placeholder={post.postImg} value={post.postImg}
                       onChange={onChange}/>
                <input className="update_postDescription" type="text" name="description" placeholder={post.description} value={post.description}
                       onChange={onChange}/>

                <button className="editBtn">Edit</button>
            </form>
        </div>
    )
}