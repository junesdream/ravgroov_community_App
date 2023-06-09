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

        event.preventDefault();
        try {
            await props.onLogin(username, password);
            navigate("/");
        } catch (error) {
            console.error(error);
        }

    }

    return (

        <div className="login">
            <div className="log_card">
                <div className="log_left">
                    <h1>Hi, Happy Ravers!</h1>
                    <p>
                        Unleash the Berlin groove with RavGroove! The ultimate non-commercial app for rave enthusiasts.
                        Connect, discover, and immerse yourself in pulsating beats, exclusive events, and a vibrant community.
                        Join the revolution. RavGroove - where the groove comes alive!
                    </p>
                    <span>Don't you have an account?</span>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>

                </div>
                <div className="log_right">
                    <h1>Login</h1>
                    <form onSubmit={onSubmit}>
                        <input value={username} placeholder="username" type="text" onChange={e => setUsername(e.target.value)}/>
                        <input value={password} placeholder="password" type="password" onChange={e => setPassword(e.target.value)} />
                        <button type="submit"  >Login </button>
                    </form>
                </div>
            </div>
        </div>

    )
}