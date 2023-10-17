import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import FollowModel from "../../../Models/FollowModel";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import followService from "../../../Services/FollowService";
import "./VacationCard.css";
import RoleModel from "../../../Models/RoleModel";

// Define props for VacationCard
interface VacationCardProps {
    vacation: VacationModel;
    userId: number;
    followersCount: number;
    // Pass the user object as a prop
    user: UserModel;
    onDelete: (vacationId: number) => void; // Add the onDelete prop
    onUpdateVacations: (vacationId: number, isFollowed: boolean) => void;
}

function VacationCard(props: VacationCardProps): JSX.Element {
    // Function to format price
    function formatPrice(price: number): string {
        return `₪${price.toFixed(2)}`;
    }

    // State to track follow status and followers count for the card
    const [isFollowed, setIsFollowed] = useState<boolean>(false);
    const [countFollowersInCard, setCountFollowersInCard] = useState<number>(props.followersCount); // Use the prop as initial state

    // Get the user ID from props
    const userId = props.userId;

    useEffect(() => {
        // Fetch the user's follow status for this vacation when the component mounts
        const vacationId = props.vacation.vacationId;

        followService.checkIfUserIsFollowing(userId, vacationId)
            .then((result) => {
                setIsFollowed(result); // Set the initial state based on the follow status
            })
            .catch((error) => {
                console.error("Error checking follow status:", error);
            });
        // }, [props.vacation.followersCount]); // Add props.vacation.vacationId as a dependency
    }, [props.vacation.vacationId, userId]);

    // Function to handle follow/unfollow button click
    function handleFollowClick() {
        const followModel: FollowModel = {
            userId: userId,
            vacationId: props.vacation.vacationId,
        };

        if (isFollowed) {
            followService.unFollowVacation(followModel)
                .then(() => {
                    setIsFollowed(false);
                    setCountFollowersInCard(countFollowersInCard - 1);
                    // Trigger an auto-update in the parent component (ListVacation) after unfollow
                    // Update the frontendVacations state in ListVacation component
                    props.onUpdateVacations(props.vacation.vacationId, false);
                })
                .catch((error) => {
                    console.error("Error unfollowing vacation:", error);
                });
        } else {
            followService.followVacation(followModel)
                .then(() => {
                    setIsFollowed(true);
                    setCountFollowersInCard(countFollowersInCard + 1);
                    // Trigger an auto-update in the parent component (ListVacation) after follow
                    // Update the frontendVacations state in ListVacation component
                    props.onUpdateVacations(props.vacation.vacationId, true);
                })
                .catch((error) => {
                    console.error("Error following vacation:", error);
                });
        }
    }

    const isAdmin = props.user?.roleId === RoleModel.Admin;

    return (
        <div className="VacationCard">
            {/* Display the image at the top */}
            <img src={props.vacation?.imageUrl} alt={props.vacation.vacationDestination} />

            <div>
                <h5>{props.vacation?.vacationDestination}</h5>

                <div className="formatted-text">{props.vacation?.vacationDescription}</div>
                
                <br></br>
                <p>
                    <strong>Start Date:</strong>{" "}
                    {new Date(props.vacation?.vacationStartDate).toLocaleDateString()}
                </p>
                <p>
                    <strong>End Date:</strong>{" "}
                    {new Date(props.vacation?.vacationEndDate).toLocaleDateString()}
                </p>
                <p>
                    <strong>Price:</strong> {formatPrice(+props.vacation?.vacationPrice)}
                </p>
                <div>
                    <p>Followers: {countFollowersInCard}</p>  {/* Use countFollowers state here */}

                </div>
                <div>
                    {!isAdmin && (
                        <button
                            onClick={handleFollowClick}
                            className={`btn ${isFollowed ? 'btn-danger' : 'btn-success'}`}
                        >
                            {isFollowed ? "Unfollow" : "Follow"}
                        </button>
                    )}
                </div>

                {isAdmin && (
                    <div>
                        <button onClick={() => props.onDelete(props.vacation.vacationId)} className="btn btn-danger">Delete</button>
                        <br></br><br></br>
                        <NavLink to={"edit/" + props.vacation?.vacationId} className="btn btn-primary">Edit</NavLink>
                    </div>
                )}
            </div>
        </div>
    );
}

export default VacationCard;


