import React, {FormEvent, useState} from "react";
import "./AddPost.css"
import {NewPost} from "../../model/Post";
import {useNavigate} from "react-router-dom";

type AddPostProps = {
    addPost: (newPost: NewPost) => void
}
export default function AddPost(props: AddPostProps) {

    const navigate = useNavigate();

    const initialState = {
        title: "",
        userName:"",
        postImg: "",
        description: ""
    }
    const [post, setPost] = useState<NewPost>(initialState);

    function onSavePost(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        props.addPost(post);
        setPost(initialState)
        navigate("/posts")

    }

const addPost = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const name = event.target.name;
        const value = event.target.value;
        setPost({...post, [name]: value})
        console.log(post);
};



    return (
        <div className="add_post">
            <form className="add_input" onSubmit={onSavePost} >
                <input className="add_postTitle" type="text" name="title" value={post.title} onChange={(event) => addPost(event)}/>
                <input className="add_postUsername" type="text" name="userName" value={post.userName} onChange={(event) => addPost(event)} />
                <input className="add_postPostimg" type="text" name="postImg" value={post.postImg} onChange={(event) => addPost(event)}/>
                <input className="add_postDescription" type="text" name="description" value={post.description} onChange={(event) => addPost(event)} />

                <button className="addBtn" >Add</button>
            </form>

        </div>
    )
}