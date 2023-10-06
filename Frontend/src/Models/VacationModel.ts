class VacationModel {
    public vacationId: number;
    public vacationDestination: string;
    public vacationDescription: string;
    public vacationStartDate: string;
    public vacationEndDate: string;
    public vacationPrice: number;
    public imageUrl: string;
    public image: File; //FileList
    public followersCount: number;
    public isFollowing: boolean; // Add this property to indicate if the user is following
}

export default VacationModel;
