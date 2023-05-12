import {useCallback, useEffect, useState} from "react";
import {NewPost, Post} from "./model/Post";
import axios from "axios";
import {toast} from "react-toastify";


export default function usePosts() {

    const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
        allPosts()
    }, []);

    function allPosts() {
        axios.get("/api/posts")
            .then((response => {
                setPosts(response.data)
            }))
            .catch((error) => {
                console.error(error)
            })
    }

    const loadAllPosts = useCallback(() => {
        axios
            .get("/api/posts")
            .then((response) => {
                setPosts(response.data);
                toast.success("Posts loaded!");
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to load posts.");
            });
    }, []);

    function addPost(postToAdd: NewPost, image: File | undefined) {

        const data = new FormData()

        if (image) {
            data.append("file", image)
        }

        data.append("data", new Blob([JSON.stringify(postToAdd)], {'type': "application/json"}))

        axios.post("/api/posts", data)
            .then((addPostResponse) => {

                setPosts([...posts, addPostResponse.data])
            })
            .catch((error) => {
                error("Unknown Error, try again later! " + error.response.statusText, {autoClose: 10000})
            })
    }
    function updatePost(post: Post) {
        axios.put(`/api/posts/${post.id}`, post)
            .then((putPostResponse) => {
                setPosts(posts.map(currentPost => {
                    if (currentPost.id === post.id) {
                        return putPostResponse.data
                    } else {
                        return currentPost
                    }
                }))
            })
            .catch(console.error)
    }

    function deletePost(id: string) {
        axios.delete("/api/posts/" + id)
            .then(() => {
                setPosts(posts.filter((post) => post.id !== id))
            })
            .catch((r) => {
                console.error(r)
            })
    }

    return {posts, allPosts, addPost, updatePost, deletePost, loadAllPosts}
}