import { forgotPassword } from "./actions";

export default async function ForgotPasswordPage() {

    return (
        <>
            <div>
                <form>
                    <label htmlFor="email">Email</label>
                    <input name="email" placeholder="Email here..." type="email" />
                    <button formAction={forgotPassword} type="submit">Reset Password</button>
                </form>
            </div>
        </>
    )
}