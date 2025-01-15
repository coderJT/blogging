"use client";

export default function PrivatePage() {
    return (
        <div>
            <h1>Success!</h1>
            <form action="/auth/signout" method="post">
                <button type="submit">Sign out</button>
            </form>
        </div>
    )
}