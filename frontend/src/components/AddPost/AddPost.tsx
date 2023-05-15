import React, {ChangeEvent, FormEvent, useState} from "react";
import "./AddPost.css"
import {NewPost} from "../../model/Post";
import {useNavigate} from "react-router-dom";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";

type AddPostProps = {
    addPost: (newPost: NewPost, image: File | undefined) => void
}
export default function AddPost(props: AddPostProps) {

    const navigate = useNavigate();

    const initialState = {
        id: "",
        title: "",
        userName: "",
        postImg: "",
        description: "",
        profilePic: "",
        url: "",
        like: true
    }
    const [post, setPost] = useState<NewPost>(initialState);
    const [image, setImage] = useState<File>();

    function onSavePost(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        props.addPost(post, image);
        setPost(initialState)
        navigate("/")

    }

    const addPost = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setPost({...post, [name]: value})

        console.log(post);
    };

    function onFileChange(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            setImage(event.target.files[0])

        }
    }

    return (
        <div className="add_post">

            <div className="profile_images">
                <img
                    src="https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt=""
                    className="cover"
                />
                <img
                    src="https://images.pexels.com/photos/3903092/pexels-photo-3903092.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt="DJ"
                    className="profilePic"
                />
            </div>

            <div className="profile_container">
                <div className="detail_profile_info">

                    <div className="profile_center">
                        <span>Mikey Poladoors</span>
                        <div className="profile_center_info">
                            <div className="profile_center_item">
                                <PlaceIcon/>
                                <span>Germany</span>
                            </div>
                            <div className="profile_center_item">
                                <LanguageIcon/>
                                <span>RA</span>
                            </div>
                        </div>
                        <button>follow</button>
                        <span>My Posts</span>
                    </div>
                </div>
            </div>

            <div className="add_post_form">
                <form className="add_input" onSubmit={onSavePost}>
                    <h3>What's new to tell?</h3>
                    <span>Title</span>
                    <input className="add_postTitle" type="text" name="title" value={post.title}
                           onChange={(event) => addPost(event)}/>
                    <span>Username</span>
                    <input className="add_postUsername" type="text" name="userName" value={post.userName}
                           onChange={(event) => addPost(event)}/>
                    <span>Image</span>
                    <input className="add_postPostimg" type="file" name="postImg" onChange={onFileChange}/>
                    <span>Tell us your about the story</span>
                    <input className="add_postDescription" type="text" name="description" value={post.description}
                           onChange={(event) => addPost(event)}/>
                    <button className="addBtn">Add</button>
                </form>
            </div>

        </div>
    )
}