import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./AuthMenu.css";

/**
 * AuthMenu component displays the navigation menu based on the user's authentication status.
 * It provides options to log in, register, log out, and access the vacation list.
 */

function AuthMenu(): JSX.Element {
    // Initialize user state using the AuthState store
    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        // Subscribe to changes in the authentication state
        setUser(authStore.getState().user);
        const unsubscribe = authStore.subscribe(() => setUser(authStore.getState().user));
        return unsubscribe;
    }, []);

    /**
  * Logs the user out of the application.
  */
    function logoutMe(): void {
        authService.logout();
        notifyService.success("Bye Bye...");
    }

    return (
        <div className="AuthMenu">

            {!user &&
                <div>
                    <span>Hello Guest | </span>
                    <NavLink to="/login">Login</NavLink>
                    <span> | </span>
                    <NavLink to="/register">Register</NavLink>
                </div>
            }

            {user &&
                <div>
                    <span>Hello {user.firstName} {user.lastName} |</span>
                    <NavLink to="/home" onClick={logoutMe}>Logout | </NavLink>
                    {user.roleId === 1 && <span> | </span>}
                    {user && <NavLink to="/vacations">Vacation List</NavLink>}

                </div>
            }

        </div>
    );
}

export default AuthMenu;
