import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Login.css";

/**
 * Login component provides a form for users to log in.
 * It handles form submission, user authentication, and navigation to the vacation list upon successful login.
 */
function Login(): JSX.Element {
    // Initialize the useForm hook for managing form state
    const { register, handleSubmit } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    /**
     * Handles form submission by sending user credentials for authentication.
     * @param {CredentialsModel} credentials - The user's login credentials (email and password).
     */
    async function send(credentials: CredentialsModel): Promise<void> {
        try {
            // Attempt to log in the user using the provided credentials
            await authService.login(credentials)
            notifyService.success("You have been successfully logged-in.");
            // Redirect the user to the vacation list upon successful login
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Login">

            <h2>Login</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>Email: </label>
                <input type="email" {...register("email")}
                    required />

                <label>Password: </label>
                <input type="password" {...register("password")}
                    required />

                <button className="btn btn-primary">Login</button>

            </form>

        </div>
    );
}

export default Login;
