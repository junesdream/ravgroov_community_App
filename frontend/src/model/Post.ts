export type Post = {
    id: string,
    title: string,
    userName: string,
    postImg: string,
    description: string,
    profilePic: string,
    like: boolean,
    url: string
}

export type NewPost = {
    title: string,
    userName: string,
    postImg: string,
    description: string
}