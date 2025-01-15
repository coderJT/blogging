import { login, signup } from "./actions";

export default function LoginPage() {
    return (
        <form>
            <label htmlFor="email">Email: </label>
            <input id="email" name="email" type="email" required></input>

            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" required></input>

            <button formAction={login}>Login</button>
            <button formAction={signup}>Sign up</button>
        </form>
    )
}