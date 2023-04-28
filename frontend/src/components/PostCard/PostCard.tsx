import {useNavigate} from "react-router-dom";
import {Post} from "../../model/Post";
import "./PostCard.css"
type Props = {
    post: Post
}

export default function PostCard(props: Props) {


    return (
        <div className='post_card'>
<h1> Post  </h1>
            <p>{props.post.title} </p>
            <p>{props.post.userName} </p>
            <p>{props.post.postImg} </p>
            <p>{props.post.description} </p>
            <p>{props.post.like} </p>



        </div>
    )
}



