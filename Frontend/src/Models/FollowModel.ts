class FollowModel {

    public userId: number;
    public vacationId: number;

    public constructor(follow: FollowModel) {    //Copy-constructor
        this.userId = follow.userId;
        this.vacationId = follow.vacationId;
    }
}

export default FollowModel;