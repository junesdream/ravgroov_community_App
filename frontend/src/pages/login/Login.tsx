import {FormEvent, useState} from "react";
import "./Login.css"
import {useNavigate, Link} from "react-router-dom";


type Props = {
    onLogin: (username: string, password: string) => Promise<void>
}
export default function Login(props: Props) {

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const navigate = useNavigate()

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
       /* event.preventDefault()

        props.onLogin(username, password)
            .then(() => {
                navigate("/posts")
            })*/

        event.preventDefault();
        try {
            await props.onLogin(username, password);
            navigate("/posts");
        } catch (error) {
            console.error(error);
        }

    }
    return (

        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>Hi, Happy Ravers!</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
                        alias totam numquam ipsa exercitationem dignissimos, error nam,
                        consequatur.
                    </p>
                    <span>Don't you have an account?</span>
                    <Link to="/register">
                    <button>Register</button>
                </Link>

                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form onSubmit={onSubmit}>
                        <input value={username} placeholder="username" type="text" onChange={e => setUsername(e.target.value)}/>
                        <input value={password} placeholder="password" type="password" onChange={e => setPassword(e.target.value)} />
                        <button type="submit">Login </button>
                    </form>
                </div>
            </div>
        </div>

    )

}