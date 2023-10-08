import { useForm } from "react-hook-form";
import "./Register.css";
import UserModel from "../../../Models/UserModel";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";

/**
 * The `Register` component is responsible for rendering a registration form.
 * Users can enter their first name, last name, email, and password to register for an account.
 * Upon successful registration, users are redirected to the "/vacations" page.
 */
function Register(): JSX.Element {
    const { register, handleSubmit } = useForm<UserModel>();
    const navigate = useNavigate();

    async function send(user: UserModel) {
        try {
            await authService.register(user);
            notifyService.success("You have been successfully registered.");
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Register">

            <h2>Register</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>First name: </label>
                <input type="text" {...register("firstName")}
                    min={2}
                    max={30}
                    required />

                <label>Last name: </label>
                <input type="text" {...register("lastName")}
                    min={2}
                    max={30}
                    required />

                <label>Email: </label>
                <input type="email" {...register("email")}
                    min={4}
                    max={60}
                    required />

                <label>Password: </label>
                <input type="password" {...register("password")}
                    min={4}
                    max={150}   //Intentionally the limit here on the number of characters is smaller than the limit of characters in the database because I take into account the hashing
                    required />

                <button className="btn btn-primary">Register</button>

            </form>

        </div>
    );
}

export default Register;
