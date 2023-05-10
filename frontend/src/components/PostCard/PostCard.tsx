import {Post} from "../../model/Post";
import "./PostCard.css"
import {useNavigate} from "react-router-dom";

type Props = {
    post: Post
    deletePost: (id: string) => void
}

export default function PostCard(props: Props) {

    const navigate = useNavigate()

    function onDeleteClick() {
        props.deletePost(props.post.id)
    }

    return (
        <div className='post_card'>
            <h1> Post </h1>
            <p>{props.post.title} </p>
            <p>{props.post.userName} </p>
            <p>{props.post.postImg} </p>
            <p>{props.post.description} </p>
            <p>{props.post.like} </p>
            <img src={props.post.url} alt="Post image" width={200} />
            <div className="post_card-btn">
                <button onClick={() => {
                    navigate('/posts/' + props.post.id)
                }}>Detail
                </button>
                <button onClick={onDeleteClick}>Delete</button>
            </div>

        </div>
    )
}



