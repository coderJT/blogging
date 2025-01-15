export default function CheckEmailPage() {
    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
            <h1 className="text-2xl font-bold mb-4">Check Your Email</h1>
            <p>
                We&apos;ve sent you an email with a link to reset your password. 
                Please check your inbox and follow the instructions.
            </p>
            <p className="text-sm text-gray-500 mt-4">
                If you don&apos;t see the email, please check your spam folder.
            </p>
        </div>
    );
} 