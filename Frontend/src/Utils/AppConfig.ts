class AppConfig {
    public readonly registerUrl = "http://localhost:4000/api/register/";
    public readonly loginUrl = "http://localhost:4000/api/login/";
    public readonly vacationsUrl = "http://localhost:4000/api/vacations/";
    public readonly followUrl = "http://localhost:4000/api/follow/";
    public readonly unfollowUrl = "http://localhost:4000/api/unfollow/";
    public readonly isUserFollowUrl = "http://localhost:4000/api/checkIfUserIsFollowing/";
    public readonly getFollowedVacations = "http://localhost:4000/api/getFollowedVacations/";
    public readonly getOneVacation = "http://localhost:4000/api/vacationsById/";
}

const appConfig = new AppConfig();

export default appConfig;


